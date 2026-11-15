import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file into process.env
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1024).max(65535).default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  AI_PROVIDER: z.enum(['mock', 'openai', 'gemini', 'anthropic', 'ollama', 'openrouter', 'core42', 'corex']).default('mock'),
  AI_API_KEY: z.string().optional().default(''),
  AI_MODEL: z.string().optional().default(''),
  AI_BASE_URL: z.string().optional().default(''),
  AI_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(30),
});

export type EnvConfig = z.infer<typeof envSchema>;

function loadConfig(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.format();
    console.error('❌ FATAL: Invalid backend environment configuration:', JSON.stringify(formatted, null, 2));
    throw new Error('Environment variable validation failed');
  }
  return result.data;
}

export const env = loadConfig();
