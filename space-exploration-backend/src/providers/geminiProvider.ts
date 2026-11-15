import { AIProvider, InternalMessage, StreamOptions } from '../types/chat.js';
import { ProviderError } from './types.js';

export interface GeminiConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

/**
 * Adapter for Google Gemini API streaming via REST streamGenerateContent SSE.
 */
export class GeminiProvider implements AIProvider {
  public readonly name = 'gemini';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-1.5-flash';
    this.baseUrl = config.baseUrl?.replace(/\/+$/, '') || 'https://generativelanguage.googleapis.com';
  }

  public async *generateStream(
    messages: InternalMessage[],
    options?: StreamOptions
  ): AsyncIterable<string> {
    const url = `${this.baseUrl}/v1beta/models/${this.model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const systemMsg = messages.find((m) => m.role === 'system');
    const conversationMsgs = messages.filter((m) => m.role !== 'system');

    const contents = conversationMsgs.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const payload: Record<string, any> = {
      contents,
      generationConfig: {
        temperature: 0.7,
      },
    };

    if (systemMsg) {
      payload.systemInstruction = {
        parts: [{ text: systemMsg.content }],
      };
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(payload),
        signal: options?.signal,
      });
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      throw new ProviderError(
        `Failed to connect to Google Gemini AI service: ${err.message || 'Network error'}`,
        'PROVIDER_NETWORK_ERROR'
      );
    }

    if (!response.ok) {
      throw new ProviderError(
        `Gemini provider returned error HTTP ${response.status}`,
        'PROVIDER_HTTP_ERROR',
        response.status
      );
    }

    if (!response.body) {
      throw new ProviderError('Gemini provider returned an empty response body', 'EMPTY_RESPONSE');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6).trim();
            try {
              const parsed = JSON.parse(dataStr);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text && typeof text === 'string') {
                yield text;
              }
            } catch {
              // Ignore partial JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
