# Educational Space Exploration AI Chatbot Backend

A production-grade, secure, and extensible Node.js + Express + TypeScript backend API designed to power conversational exploration of spacecraft, missions, and planetary science. Features Server-Sent Events (SSE) streaming, strict input validation, rate limiting, and vendor-agnostic AI provider adapters.

---

## Architecture Overview

```
src/
├── config/
│   └── env.ts                 # Validated environment configuration (Zod schema)
├── controllers/
│   └── chatController.ts      # SSE streaming controller with abort/timeout handlers
├── middleware/
│   ├── cors.ts                # Strict origin checking & OPTIONS preflight
│   ├── rateLimiter.ts         # Sliding-window in-memory rate limiter
│   └── validation.ts          # Zod schema validation for chat requests
├── prompts/
│   └── systemPrompt.ts        # Educational system prompt & context injector
├── providers/
│   ├── types.ts               # Provider error types & stream interfaces
│   ├── mockProvider.ts        # Zero-credential educational mock provider
│   ├── openaiCompatibleProvider.ts # OpenAI / Groq / Ollama / DeepSeek adapter
│   ├── geminiProvider.ts      # Google Gemini REST streaming adapter
│   ├── anthropicProvider.ts   # Anthropic Claude Messages API adapter
│   └── factory.ts             # Provider factory & config selector
├── routes/
│   ├── chatRoutes.ts          # POST /api/v1/chat route definition
│   └── healthRoutes.ts        # GET /api/v1/health status route
├── services/
│   └── chatService.ts         # System prompt builder & provider orchestrator
├── types/
│   └── chat.ts                # TypeScript interfaces and contracts
├── app.ts                     # Express application assembler
└── server.ts                  # Server entrypoint and graceful shutdown
```

---

## API Contract

### 1. Chat Completion Stream (`POST /api/v1/chat`)

- **Content-Type**: `application/json`
- **Response Format**: `text/event-stream; charset=utf-8`

#### Request Payload
```json
{
  "conversationId": "conv_123",
  "messages": [
    {
      "role": "user",
      "content": "What was its main purpose?"
    }
  ],
  "context": {
    "spacecraftId": "opportunity",
    "spacecraftName": "Opportunity",
    "celestialBody": "Mars",
    "missionName": "Mars Exploration Rover",
    "missionFacts": [
      "Landed on Mars in January 2004",
      "Explored Meridiani Planum"
    ]
  }
}
```

*Note*: `context` is optional. Only `role: "user"` and `role: "assistant"` are permitted in `messages`. System prompt overrides are strictly rejected.

#### SSE Events Emitted

1. **`event: delta`** (Streamed text chunk):
   ```
   event: delta
   data: {"text":"The Opportunity rover..."}
   ```

2. **`event: done`** (Stream completion):
   ```
   event: done
   data: {"conversationId":"conv_123"}
   ```

3. **`event: error`** (Graceful failure or timeout):
   ```
   event: error
   data: {"code":"PROVIDER_ERROR","message":"Unable to generate a response from the AI provider."}
   ```

### 2. Health & Provider Check (`GET /api/v1/health`)

#### Response
```json
{
  "status": "ok",
  "service": "space-exploration-chatbot-backend",
  "provider": "mock",
  "timestamp": "2026-11-14T15:20:00.000Z"
}
```

---

## Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Type | Default | Description |
|---|---|---|---|
| `PORT` | number | `3000` | Port the HTTP server binds to |
| `NODE_ENV` | string | `development` | `development`, `production`, or `test` |
| `FRONTEND_URL` | string | `http://localhost:5173` | Allowed frontend origin for CORS |
| `AI_PROVIDER` | string | `mock` | `mock`, `openai`, `gemini`, `anthropic`, `ollama`, `openrouter` |
| `AI_API_KEY` | string | `""` | API key for the chosen provider |
| `AI_MODEL` | string | `""` | Model identifier (defaults by provider) |
| `AI_BASE_URL` | string | `""` | Custom API base URL (optional) |
| `AI_TIMEOUT_MS` | number | `30000` | Timeout in ms before aborting provider requests |
| `RATE_LIMIT_WINDOW_MS` | number | `60000` | Rate limiting sliding window in ms |
| `RATE_LIMIT_MAX_REQUESTS` | number | `30` | Max requests allowed per window per IP |

---

## How to Switch AI Providers

No code changes are required to switch vendors. Adjust `.env`:

### 1. Mock Provider (Default, zero setup needed)
```env
AI_PROVIDER=mock
```

### 2. OpenAI / Groq / DeepSeek
```env
AI_PROVIDER=openai
AI_API_KEY=sk-proj-...
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1
```

### 3. Google Gemini
```env
AI_PROVIDER=gemini
AI_API_KEY=AIzaSy...
AI_MODEL=gemini-1.5-flash
```

### 4. Anthropic Claude
```env
AI_PROVIDER=anthropic
AI_API_KEY=sk-ant-...
AI_MODEL=claude-3-5-sonnet-20241022
```

### 5. Local Ollama
```env
AI_PROVIDER=ollama
AI_BASE_URL=http://localhost:11434/v1
AI_MODEL=llama3.2
```

---

## Frontend Integration Guide

The frontend developer can use native browser APIs (`fetch` + `ReadableStream` or `@microsoft/fetch-event-source`):

### Complete TypeScript Client Example

```typescript
export async function sendChatMessage({
  conversationId,
  messages,
  context,
  onDelta,
  onDone,
  onError,
  abortSignal,
}: {
  conversationId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  context?: {
    spacecraftId?: string;
    spacecraftName?: string;
    celestialBody?: string;
    missionName?: string;
    missionFacts?: string[];
  };
  onDelta: (text: string) => void;
  onDone: (conversationId: string) => void;
  onError: (error: { code: string; message: string }) => void;
  abortSignal?: AbortSignal;
}) {
  const response = await fetch('http://localhost:3000/api/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId,
      messages,
      context,
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson.message || `HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('ReadableStream not supported');

  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split('\n\n');
    buffer = blocks.pop() || '';

    for (const block of blocks) {
      if (!block.trim()) continue;
      const eventMatch = block.match(/event:\s*(\w+)/);
      const dataMatch = block.match(/data:\s*(.+)/);

      if (eventMatch && dataMatch) {
        const eventType = eventMatch[1];
        const data = JSON.parse(dataMatch[1]);

        if (eventType === 'delta') {
          onDelta(data.text);
        } else if (eventType === 'done') {
          onDone(data.conversationId);
        } else if (eventType === 'error') {
          onError(data);
        }
      }
    }
  }
}
```

### Cancelling Generation
```typescript
const controller = new AbortController();

// Trigger chat
sendChatMessage({
  conversationId: 'conv_123',
  messages: [{ role: 'user', content: 'Explain cosmic radiation' }],
  abortSignal: controller.signal,
  onDelta: (chunk) => appendToUI(chunk),
  onDone: () => finalize(),
  onError: (err) => showError(err),
});

// To cancel (e.g. user clicks Stop button or navigates away):
controller.abort();
```

---

## Running the Application

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Running Tests
```bash
npm test
```
All 19 test cases across 5 test suites pass verifying validation, streaming, spacecraft context, provider failures, cancellation, CORS, and rate limiting.
