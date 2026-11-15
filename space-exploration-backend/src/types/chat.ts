/**
 * Types and interfaces for the Space Exploration AI Chatbot backend.
 */

export type UserOrAssistantRole = 'user' | 'assistant';
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: UserOrAssistantRole;
  content: string;
}

export interface InternalMessage {
  role: MessageRole;
  content: string;
}

export interface SpacecraftContext {
  spacecraftId?: string;
  spacecraftName?: string;
  celestialBody?: string;
  missionName?: string;
  missionFacts?: string[];
}

export interface ChatRequestBody {
  conversationId: string;
  messages: ChatMessage[];
  context?: SpacecraftContext;
}

export interface DeltaEventPayload {
  text: string;
}

export interface DoneEventPayload {
  conversationId: string;
}

export interface ErrorEventPayload {
  code: string;
  message: string;
}

export interface StreamOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface AIProvider {
  readonly name: string;
  generateStream(
    messages: InternalMessage[],
    options?: StreamOptions
  ): AsyncIterable<string>;
}
