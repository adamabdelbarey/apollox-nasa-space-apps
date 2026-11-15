import { AIProvider, InternalMessage, StreamOptions } from '../types/chat.js';
import { ProviderError } from './types.js';

export interface OpenAICompatibleConfig {
  name?: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

/**
 * Sanitizes model outputs to strictly enforce the WALLE X persona and eliminate any leaks.
 */
function sanitizeWalleXText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\b(I'm|I am)\s+(gpt[- ]?5\.1|gpt[- ]?5|gpt[- ]?4|a language model|an ai language model)\b/gi, "I'm WALLE X, your robotic space rover guide")
    .replace(/\b(gpt[- ]?5\.1|gpt[- ]?5|gpt[- ]?4|chatgpt)\b/gi, 'WALLE X')
    .replace(/\b(openai)\b/gi, 'Apollo X Mission Control')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');
}

/**
 * Adapter for OpenAI and any OpenAI-compatible API (e.g. Groq, Ollama, DeepSeek, OpenRouter, CoreX).
 */
export class OpenAICompatibleProvider implements AIProvider {
  public readonly name: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(config: OpenAICompatibleConfig) {
    this.name = config.name || 'openai-compatible';
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.model = config.model;
  }

  public async *generateStream(
    messages: InternalMessage[],
    options?: StreamOptions
  ): AsyncIterable<string> {
    const url = `${this.baseUrl}/chat/completions`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
      headers['api-key'] = this.apiKey; // Support for Core42 Compass, Azure, and other enterprise gateways
    }

    // Extract system prompt to inject as a robust directive for providers that discard system role
    const systemMsg = messages.find((m) => m.role === 'system');
    const systemContent = systemMsg ? systemMsg.content : '';

    // Map conversation messages. For the latest user query, ensure the WALLE X identity directive is present.
    const outboundMessages = messages.map((m, idx) => {
      if (m.role === 'user' && idx === messages.length - 1 && systemContent) {
        return {
          role: m.role,
          content: `[MISSION DIRECTIVE: You are WALLE X, a cheerful, curious solar-powered robotic space rover on Apollo X. Your name is strictly WALLE X. Never say you are GPT, GPT-5, or an AI language model. Keep answers fresh, exciting, and avoid repeating identical sign-off phrases.]\n\n${m.content}`,
        };
      }
      return {
        role: m.role,
        content: m.content,
      };
    });

    const payload = {
      model: this.model,
      messages: outboundMessages,
      stream: true,
      temperature: 0.85,
      presence_penalty: 0.5,
      frequency_penalty: 0.4,
    };

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: options?.signal,
      });
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      throw new ProviderError(
        `Failed to connect to ${this.name} AI service: ${err.message || 'Network error'}`,
        'PROVIDER_NETWORK_ERROR'
      );
    }

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch {
        // ignore
      }
      throw new ProviderError(
        `AI provider returned error HTTP ${response.status}`,
        'PROVIDER_HTTP_ERROR',
        response.status
      );
    }

    if (!response.body) {
      throw new ProviderError('AI provider returned an empty response body', 'EMPTY_RESPONSE');
    }

    const contentType = response.headers.get('content-type') || '';

    // Handle non-streaming JSON responses (e.g. gateways that return full JSON completions)
    if (contentType.includes('application/json')) {
      const data: any = await response.json();
      const content = sanitizeWalleXText(
        data.choices?.[0]?.message?.content ||
        data.choices?.[0]?.delta?.content ||
        data.answer ||
        ''
      );

      if (!content) {
        return;
      }

      // Break into natural conversational deltas for smooth client-side streaming
      const words = content.split(' ');
      let current = '';
      for (let i = 0; i < words.length; i++) {
        if (options?.signal?.aborted) {
          const err = new Error('Request was aborted');
          err.name = 'AbortError';
          throw err;
        }
        current += (current ? ' ' : '') + words[i];
        if ((i + 1) % 2 === 0 || i === words.length - 1) {
          yield current + (i === words.length - 1 ? '' : ' ');
          current = '';
          await new Promise((r) => setTimeout(r, 20));
        }
      }
      return;
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
            if (dataStr === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(dataStr);
              const deltaContent = parsed.choices?.[0]?.delta?.content;
              if (deltaContent && typeof deltaContent === 'string') {
                yield sanitizeWalleXText(deltaContent);
              }
            } catch {
              // Ignore partial JSON lines
            }
          }
        }
      }

      // Check remaining buffer
      if (buffer.trim().startsWith('data: ')) {
        const dataStr = buffer.trim().slice(6).trim();
        if (dataStr !== '[DONE]') {
          try {
            const parsed = JSON.parse(dataStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent && typeof deltaContent === 'string') {
              yield sanitizeWalleXText(deltaContent);
            }
          } catch {
            // Ignore
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
