import { EnvConfig } from '../config/env.js';
import { AIProvider } from '../types/chat.js';
import { MockProvider } from './mockProvider.js';
import { OpenAICompatibleProvider } from './openaiCompatibleProvider.js';
import { GeminiProvider } from './geminiProvider.js';
import { AnthropicProvider } from './anthropicProvider.js';

/**
 * Creates an instance of an AI provider based on configuration.
 * Keeps provider specifics fully decoupled from the core application.
 */
export function createAIProvider(config: EnvConfig): AIProvider {
  const providerType = config.AI_PROVIDER.toLowerCase();

  switch (providerType) {
    case 'mock':
      return new MockProvider();

    case 'openai':
      if (!config.AI_API_KEY) {
        throw new Error('AI_API_KEY is required when AI_PROVIDER is set to "openai"');
      }
      return new OpenAICompatibleProvider({
        name: 'openai',
        apiKey: config.AI_API_KEY,
        baseUrl: config.AI_BASE_URL || 'https://api.openai.com/v1',
        model: config.AI_MODEL || 'gpt-4o-mini',
      });

    case 'gemini':
      if (!config.AI_API_KEY) {
        throw new Error('AI_API_KEY is required when AI_PROVIDER is set to "gemini"');
      }
      return new GeminiProvider({
        apiKey: config.AI_API_KEY,
        model: config.AI_MODEL || 'gemini-1.5-flash',
        baseUrl: config.AI_BASE_URL,
      });

    case 'anthropic':
      if (!config.AI_API_KEY) {
        throw new Error('AI_API_KEY is required when AI_PROVIDER is set to "anthropic"');
      }
      return new AnthropicProvider({
        apiKey: config.AI_API_KEY,
        model: config.AI_MODEL || 'claude-3-5-sonnet-20241022',
        baseUrl: config.AI_BASE_URL,
      });

    case 'ollama':
      return new OpenAICompatibleProvider({
        name: 'ollama',
        apiKey: config.AI_API_KEY || '',
        baseUrl: config.AI_BASE_URL || 'http://localhost:11434/v1',
        model: config.AI_MODEL || 'llama3.2',
      });

    case 'openrouter':
      if (!config.AI_API_KEY) {
        throw new Error('AI_API_KEY is required when AI_PROVIDER is set to "openrouter"');
      }
      return new OpenAICompatibleProvider({
        name: 'openrouter',
        apiKey: config.AI_API_KEY,
        baseUrl: config.AI_BASE_URL || 'https://openrouter.ai/api/v1',
        model: config.AI_MODEL || 'meta-llama/llama-3.1-8b-instruct',
      });

    case 'core42':
    case 'corex':
      if (!config.AI_API_KEY) {
        throw new Error('AI_API_KEY is required when AI_PROVIDER is set to "core42" or "corex"');
      }
      return new OpenAICompatibleProvider({
        name: 'corex-cosmo',
        apiKey: config.AI_API_KEY,
        baseUrl: config.AI_BASE_URL || 'https://collabs.corexai.online/apis/cosmo/v1',
        model: config.AI_MODEL || 'cosmo',
      });

    default:
      console.warn(`Unknown AI_PROVIDER "${config.AI_PROVIDER}". Falling back to mock provider.`);
      return new MockProvider();
  }
}
