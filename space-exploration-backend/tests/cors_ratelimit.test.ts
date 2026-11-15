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
  AI_TIMEOUT_MS: 5000,
  RATE_LIMIT_WINDOW_MS: 60000,
  RATE_LIMIT_MAX_REQUESTS: 5, // low limit to test rate limiting
};

describe('CORS and Rate Limiting Behavior', () => {
  const app = createApp({ envConfig: mockEnv });

  it('allows requests originating from the configured FRONTEND_URL', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Origin', 'http://localhost:5173');

    assert.equal(res.status, 200);
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });

  it('handles OPTIONS preflight requests cleanly from allowed origin', async () => {
    const res = await request(app)
      .options('/api/v1/chat')
      .set('Origin', 'http://localhost:5173');

    assert.equal(res.status, 204);
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
    assert.ok(res.headers['access-control-allow-methods'].includes('POST'));
  });

  it('rejects requests originating from unauthorized foreign origins', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Origin', 'http://malicious-site.example.com');

    assert.equal(res.status, 403);
    assert.equal(res.body.code, 'CORS_FORBIDDEN');
  });

  it('rejects OPTIONS preflight from unauthorized foreign origins with 403', async () => {
    const res = await request(app)
      .options('/api/v1/chat')
      .set('Origin', 'http://malicious-site.example.com');

    assert.equal(res.status, 403);
    assert.equal(res.body.code, 'CORS_FORBIDDEN');
  });

  it('enforces rate limiting when request limit is exceeded', async () => {
    const testApp = createApp({
      envConfig: {
        ...mockEnv,
        RATE_LIMIT_MAX_REQUESTS: 3,
      },
    });

    const clientIp = '192.168.1.100';

    // 3 allowed requests
    for (let i = 0; i < 3; i++) {
      const res = await request(testApp)
        .get('/api/v1/health')
        .set('X-Forwarded-For', clientIp);
      assert.equal(res.status, 200);
    }

    // 4th request must be rate limited (429)
    const rateLimitedRes = await request(testApp)
      .get('/api/v1/health')
      .set('X-Forwarded-For', clientIp);

    assert.equal(rateLimitedRes.status, 429);
    assert.equal(rateLimitedRes.body.code, 'RATE_LIMIT_EXCEEDED');
    assert.ok(rateLimitedRes.headers['retry-after']);
  });
});
