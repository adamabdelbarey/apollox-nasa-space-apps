import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from '../src/app.js';
import { EnvConfig } from '../src/config/env.js';
import { AIProvider, InternalMessage, StreamOptions } from '../src/types/chat.js';

const mockEnv: EnvConfig = {
  PORT: 3000,
  NODE_ENV: 'test',
  FRONTEND_URL: 'http://localhost:5173',
  AI_PROVIDER: 'mock',
  AI_API_KEY: '',
  AI_MODEL: '',
  AI_BASE_URL: '',
  AI_TIMEOUT_MS: 10000,
  RATE_LIMIT_WINDOW_MS: 60000,
  RATE_LIMIT_MAX_REQUESTS: 100,
};

describe('Client Cancellation & Disconnection', () => {
  it('aborts provider stream immediately when client closes connection', async () => {
    let wasAborted = false;

    // Custom test provider that tracks abort signal
    const trackingProvider: AIProvider = {
      name: 'tracking-mock',
      async *generateStream(_messages: InternalMessage[], options?: StreamOptions) {
        options?.signal?.addEventListener('abort', () => {
          wasAborted = true;
        });

        // Yield initial chunk
        yield 'Initial chunk';

        // Long loop waiting for abort
        for (let i = 0; i < 50; i++) {
          if (options?.signal?.aborted) {
            wasAborted = true;
            return;
          }
          await new Promise((r) => setTimeout(r, 50));
          yield ` Chunk ${i}`;
        }
      },
    };

    const app = createApp({ envConfig: mockEnv, customProvider: trackingProvider });
    const server = http.createServer(app);

    await new Promise<void>((resolve) => server.listen(0, resolve));
    const port = (server.address() as any).port;

    // Connect with native http client and abort after first chunk
    await new Promise<void>((resolve) => {
      const req = http.request(
        {
          hostname: 'localhost',
          port,
          path: '/api/v1/chat',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:5173',
          },
        },
        (res) => {
          res.on('data', () => {
            // Client disconnects right after receiving first data
            req.destroy();
          });
        }
      );

      req.on('error', () => {
        // Destroyed socket produces ECONNRESET or error
      });

      req.write(
        JSON.stringify({
          conversationId: 'conv_cancel_test',
          messages: [{ role: 'user', content: 'Tell me everything about space.' }],
        })
      );
      req.end();

      // Check abort after brief delay
      setTimeout(() => {
        assert.equal(wasAborted, true, 'Expected provider abort signal to be triggered');
        server.close(() => resolve());
      }, 300);
    });
  });
});
