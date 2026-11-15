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
  RATE_LIMIT_MAX_REQUESTS: 100,
};

// Helper parser to collect SSE chunks with supertest
function sseParser(res: any, callback: (err: Error | null, data: string) => void) {
  let data = '';
  res.on('data', (chunk: Buffer) => {
    data += chunk.toString();
  });
  res.on('end', () => {
    callback(null, data);
  });
}

describe('Streaming Chat (POST /api/v1/chat)', () => {
  const app = createApp({ envConfig: mockEnv });

  it('streams response deltas with proper SSE format and terminates with done event', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_123',
        messages: [{ role: 'user', content: 'What is a black hole?' }],
      });

    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/event-stream/);

    const sseText = res.body as string;
    assert.ok(sseText.includes('event: delta'));
    assert.ok(sseText.includes('event: done'));
    assert.ok(sseText.includes('conv_123'));

    // Parse SSE lines
    const events: Array<{ event: string; data: any }> = [];
    const normalizedText = sseText.replace(/\r\n/g, '\n');
    const blocks = normalizedText.split('\n\n');

    for (const block of blocks) {
      if (!block.trim()) continue;
      const eventMatch = block.match(/event:\s*(\w+)/);
      const dataMatch = block.match(/data:\s*(.+)/);
      if (eventMatch && dataMatch) {
        try {
          events.push({
            event: eventMatch[1],
            data: JSON.parse(dataMatch[1].trim()),
          });
        } catch {
          // ignore
        }
      }
    }

    const deltas = events.filter((e) => e.event === 'delta');
    const doneEvent = events.find((e) => e.event === 'done');

    assert.ok(deltas.length > 0, 'Expected at least one delta event');
    assert.ok(deltas.every((d) => typeof d.data.text === 'string'));

    assert.ok(doneEvent, 'Expected a done event');
    assert.equal(doneEvent.data.conversationId, 'conv_123');

    // Aggregate text
    const fullText = deltas.map((d) => d.data.text).join('');
    assert.ok(fullText.toLowerCase().includes('black hole'));
  });

  it('incorporates spacecraft context and mission facts for Opportunity rover', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_opp_456',
        messages: [{ role: 'user', content: 'What was its main purpose?' }],
        context: {
          spacecraftId: 'opportunity',
          spacecraftName: 'Opportunity',
          celestialBody: 'Mars',
          missionName: 'Mars Exploration Rover',
          missionFacts: [
            'Landed on Mars in January 2004',
            'Explored Meridiani Planum',
          ],
        },
      });

    assert.equal(res.status, 200);
    const sseText = res.body as string;
    assert.ok(sseText.includes('event: delta'));
    assert.ok(sseText.includes('event: done'));
    assert.ok(sseText.includes('conv_opp_456'));

    // Check educational content tailored to Opportunity
    assert.ok(
      sseText.toLowerCase().includes('opportunity') ||
      sseText.toLowerCase().includes('water') ||
      sseText.toLowerCase().includes('meridiani')
    );
  });

  it('maintains conversational context across multi-turn messages', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .buffer(true)
      .parse(sseParser)
      .send({
        conversationId: 'conv_multi_789',
        messages: [
          { role: 'user', content: 'Tell me about the Opportunity rover.' },
          { role: 'assistant', content: 'Opportunity was a NASA rover sent to Mars!' },
          { role: 'user', content: 'When did it land?' },
        ],
        context: {
          spacecraftName: 'Opportunity',
          celestialBody: 'Mars',
        },
      });

    assert.equal(res.status, 200);
    const sseText = res.body as string;
    assert.ok(sseText.includes('event: delta'));
    assert.ok(sseText.includes('January 2004') || sseText.includes('2004'));
  });
});
