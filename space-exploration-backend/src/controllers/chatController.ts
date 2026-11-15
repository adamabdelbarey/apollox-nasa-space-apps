import { Request, Response } from 'express';
import { ChatService } from '../services/chatService.js';
import { ChatRequestBody } from '../types/chat.js';
import { env } from '../config/env.js';
import { ProviderError, ProviderTimeoutError } from '../providers/types.js';

export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  public handleChat = async (req: Request, res: Response): Promise<void> => {
    const { conversationId, messages, context } = req.body as ChatRequestBody;

    // 1. Establish SSE headers
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    if (typeof (res as any).flushHeaders === 'function') {
      (res as any).flushHeaders();
    }

    const writeSSE = (event: 'delta' | 'done' | 'error', data: Record<string, unknown>): boolean => {
      if (res.writableEnded || res.destroyed) {
        return false;
      }
      try {
        res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        return true;
      } catch (err) {
        return false;
      }
    };

    // 2. Set up AbortController for client disconnect and timeout handling
    const abortController = new AbortController();
    let isClientDisconnected = false;

    // Handle client disconnection (connection closed before res.end was reached)
    res.on('close', () => {
      if (!res.writableEnded) {
        isClientDisconnected = true;
        abortController.abort();
      }
    });

    // Handle provider timeout
    const timeoutTimer = setTimeout(() => {
      abortController.abort(new ProviderTimeoutError('AI provider request timed out'));
    }, env.AI_TIMEOUT_MS);
    if (timeoutTimer.unref) {
      timeoutTimer.unref();
    }

    let tokenCount = 0;

    try {
      // 3. Request streaming response from ChatService
      const stream = this.chatService.streamChat(messages, context, {
        signal: abortController.signal,
        timeoutMs: env.AI_TIMEOUT_MS,
      });

      for await (const chunk of stream) {
        if (isClientDisconnected || abortController.signal.aborted) {
          break;
        }

        if (chunk && chunk.length > 0) {
          tokenCount++;
          writeSSE('delta', { text: chunk });
        }
      }

      clearTimeout(timeoutTimer);

      if (isClientDisconnected) {
        return;
      }

      // 4. Handle empty response from provider
      if (tokenCount === 0) {
        writeSSE('error', {
          code: 'EMPTY_RESPONSE',
          message: 'The AI provider returned an empty response. Please try asking again.',
        });
        res.end();
        return;
      }

      // 5. Send completion event
      writeSSE('done', { conversationId });
      res.end();
    } catch (error: any) {
      clearTimeout(timeoutTimer);

      if (isClientDisconnected) {
        return;
      }

      // Distinguish error categories
      if (error?.name === 'AbortError' || error instanceof ProviderTimeoutError || abortController.signal.aborted) {
        writeSSE('error', {
          code: 'PROVIDER_TIMEOUT',
          message: 'The AI provider took too long to respond. Please try again.',
        });
      } else if (error instanceof ProviderError) {
        // Safe sanitized provider error without exposing credentials or internal traces
        writeSSE('error', {
          code: error.code || 'PROVIDER_ERROR',
          message: 'Unable to generate a response from the AI provider.',
        });
      } else {
        // Generic fallback error
        writeSSE('error', {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while processing your exploration request.',
        });
      }

      res.end();
    }
  };
}
