import { AIProvider, ChatMessage, InternalMessage, SpacecraftContext, StreamOptions } from '../types/chat.js';
import { buildSpaceSystemPrompt } from '../prompts/systemPrompt.js';

/**
 * Core chat business service. Orchestrates prompt construction,
 * history preservation, and streaming delegation to the AI provider.
 */
export class ChatService {
  constructor(private readonly provider: AIProvider) {}

  public get providerName(): string {
    return this.provider.name;
  }

  public async *streamChat(
    messages: ChatMessage[],
    context?: SpacecraftContext,
    options?: StreamOptions
  ): AsyncIterable<string> {
    // 1. Build immutable system prompt with optional spacecraft context
    const systemPrompt = buildSpaceSystemPrompt(context);

    // 2. Assemble internal message array with system prompt first
    const internalMessages: InternalMessage[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // 3. Delegate to the provider abstraction
    const stream = this.provider.generateStream(internalMessages, options);

    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
