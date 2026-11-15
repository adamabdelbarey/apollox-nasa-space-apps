/**
 * Apollo X - Space Exploration AI Chat API Service
 * Connects frontend components to the backend SSE streaming endpoint (/api/v1/chat).
 */

export interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSpacecraftContext {
  spacecraftId?: string;
  spacecraftName?: string;
  celestialBody?: string;
  missionName?: string;
  missionFacts?: string[];
}

export interface ChatStreamOptions {
  conversationId: string;
  messages: ChatApiMessage[];
  context?: ChatSpacecraftContext;
  signal?: AbortSignal;
  onDelta: (token: string) => void;
  onDone?: (info: { conversationId: string }) => void;
  onError?: (error: { code: string; message: string }) => void;
}

export interface BackendHealthResponse {
  status: string;
  service: string;
  provider: string;
  timestamp: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api/v1';

/**
 * Checks connectivity and active AI provider from the backend health endpoint.
 */
export async function checkBackendHealth(): Promise<BackendHealthResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as BackendHealthResponse;
  } catch {
    return null;
  }
}

function cleanIncomingToken(text: string): string {
  if (!text) return '';
  return text
    .replace(/\b(I'm|I am)\s+(gpt[- ]?5\.1|gpt[- ]?5|gpt[- ]?4|a language model|an ai language model)\b/gi, "I'm WALLE X, your robotic space rover guide")
    .replace(/\b(gpt[- ]?5\.1|gpt[- ]?5|gpt[- ]?4|chatgpt)\b/gi, 'WALLE X')
    .replace(/\b(openai)\b/gi, 'Apollo X Mission Control')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');
}

/**
 * Streams chat responses token-by-token from the backend using Server-Sent Events (SSE).
 */
export async function streamChatResponse(options: ChatStreamOptions): Promise<void> {
  const { conversationId, messages, context, signal, onDelta, onDone, onError } = options;

  // Prepare validated payload matching backend Zod schema
  // Backend strictly allows 'user' or 'assistant' roles, non-empty content <= 4000 chars
  const sanitizedMessages = messages
    .filter((m) => m.content && m.content.trim().length > 0)
    .slice(-30) // Keep conversation history concise
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 4000),
    }));

  if (sanitizedMessages.length === 0) {
    throw new Error('At least one valid message is required');
  }

  // Construct context object strictly according to schema (no extra unknown keys)
  let sanitizedContext: ChatSpacecraftContext | undefined;
  if (context) {
    sanitizedContext = {};
    if (context.spacecraftId) sanitizedContext.spacecraftId = context.spacecraftId.slice(0, 100);
    if (context.spacecraftName) sanitizedContext.spacecraftName = context.spacecraftName.slice(0, 100);
    if (context.celestialBody) sanitizedContext.celestialBody = context.celestialBody.slice(0, 100);
    if (context.missionName) sanitizedContext.missionName = context.missionName.slice(0, 100);
    if (context.missionFacts && Array.isArray(context.missionFacts)) {
      sanitizedContext.missionFacts = context.missionFacts
        .filter((f) => typeof f === 'string' && f.trim().length > 0)
        .slice(0, 20)
        .map((f) => f.slice(0, 1000));
    }
  }

  const payload: {
    conversationId: string;
    messages: ChatApiMessage[];
    context?: ChatSpacecraftContext;
  } = {
    conversationId: conversationId || `conv-${Date.now()}`,
    messages: sanitizedMessages,
  };

  if (sanitizedContext && Object.keys(sanitizedContext).length > 0) {
    payload.context = sanitizedContext;
  }

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    let errorDetails = `HTTP ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson?.message) {
        errorDetails = errJson.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorDetails);
  }

  if (!response.body) {
    throw new Error('ReadableStream not supported on this response');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let sseBuffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      sseBuffer += decoder.decode(value, { stream: true });

      // Split complete SSE message blocks separated by double newline
      const events = sseBuffer.split('\n\n');
      // The last element is either empty (if trailing \n\n) or an incomplete event chunk
      sseBuffer = events.pop() || '';

      for (const eventBlock of events) {
        if (!eventBlock.trim()) continue;

        let eventType = 'message';
        let dataStr = '';

        const lines = eventBlock.split('\n');
        for (const line of lines) {
          if (line.startsWith('event:')) {
            eventType = line.slice(6).trim();
          } else if (line.startsWith('data:')) {
            dataStr = line.slice(5).trim();
          }
        }

        if (!dataStr) continue;

        try {
          const parsedData = JSON.parse(dataStr);

          if (eventType === 'delta') {
            if (typeof parsedData.text === 'string') {
              const cleaned = cleanIncomingToken(parsedData.text);
              if (cleaned) {
                onDelta(cleaned);
              }
            }
          } else if (eventType === 'done') {
            if (onDone) {
              onDone({ conversationId: parsedData.conversationId || conversationId });
            }
          } else if (eventType === 'error') {
            if (onError) {
              onError({
                code: parsedData.code || 'PROVIDER_ERROR',
                message: parsedData.message || 'Error occurred while streaming response.',
              });
            }
          }
        } catch (jsonErr) {
          console.warn('Failed to parse SSE data chunk:', dataStr, jsonErr);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
