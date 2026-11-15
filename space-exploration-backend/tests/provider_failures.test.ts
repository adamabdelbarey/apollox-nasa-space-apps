import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { EnvConfig } from '../src/config/env.js';

const mockEnv: EnvConfig = {
  PORT: 3000,
  NODE_ENV: 'test',
  FRONTEND_URL: 'http://localhost:5173',
  AI_PROVIDER: 'mock',
  AI_API_KEY: '',
  AI_MODEL: '',
  AI_BASE_URL: '',
  AI_TIMEOUT_MS: 300, // Short timeout for testing timeout handling
  RATE_LIMIT_WINDOW_MS: 60000,
  RATE_LIMIT_MAX_REQUESTS: 100,
};

function sseParser(res: any, callback: (err: Error | null, data: string) => void) {
  let data = '';
  res.on('data', (chunk: Buffer) => {
    data += chunk.toString();
  });
  res.on('end', () => {
    callback(null, data);
  });
}

describe('Provider Failures & Edge Cases (POST /api/v1/chat)', () => {
  const app = createApp({ envConfig: mockEnv });

  it('streams error event on upstream provider failure without leaking sensitive info', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_err_1',
        messages: [{ role: 'user', content: '__TRIGGER_ERROR__' }],
      });

    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/event-stream/);

    const sseText = res.body as string;
    assert.ok(sseText.includes('event: error'));
    assert.ok(sseText.includes('PROVIDER_ERROR'));
    assert.ok(!sseText.includes('stack')); // No internal stack trace leaked
  });

  it('streams error event on empty provider response', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_empty_1',
        messages: [{ role: 'user', content: '__TRIGGER_EMPTY__' }],
      });

    assert.equal(res.status, 200);
    const sseText = res.body as string;
    assert.ok(sseText.includes('event: error'));
    assert.ok(sseText.includes('EMPTY_RESPONSE'));
  });

  it('handles provider timeout gracefully with PROVIDER_TIMEOUT error event', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_timeout_1',
        messages: [{ role: 'user', content: '__TRIGGER_TIMEOUT__' }],
      });

    assert.equal(res.status, 200);
    const sseText = res.body as string;
    assert.ok(sseText.includes('event: error'));
    assert.ok(sseText.includes('PROVIDER_TIMEOUT'));
  });
});
