import { AIProvider, InternalMessage, StreamOptions } from '../types/chat.js';
import { ProviderError } from './types.js';

export interface AnthropicConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

/**
 * Adapter for Anthropic Claude Messages API streaming.
 */
export class AnthropicProvider implements AIProvider {
  public readonly name = 'anthropic';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(config: AnthropicConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'claude-3-5-sonnet-20241022';
    this.baseUrl = config.baseUrl?.replace(/\/+$/, '') || 'https://api.anthropic.com';
  }

  public async *generateStream(
    messages: InternalMessage[],
    options?: StreamOptions
  ): AsyncIterable<string> {
    const url = `${this.baseUrl}/v1/messages`;

    const systemMsg = messages.find((m) => m.role === 'system');
    const conversationMsgs = messages.filter((m) => m.role !== 'system');

    const payload: Record<string, any> = {
      model: this.model,
      max_tokens: 2048,
      temperature: 0.7,
      stream: true,
      messages: conversationMsgs.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    if (systemMsg) {
      payload.system = systemMsg.content;
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
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
        `Failed to connect to Anthropic AI service: ${err.message || 'Network error'}`,
        'PROVIDER_NETWORK_ERROR'
      );
    }

    if (!response.ok) {
      throw new ProviderError(
        `Anthropic provider returned error HTTP ${response.status}`,
        'PROVIDER_HTTP_ERROR',
        response.status
      );
    }

    if (!response.body) {
      throw new ProviderError('Anthropic provider returned an empty response body', 'EMPTY_RESPONSE');
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
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                yield parsed.delta.text;
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
