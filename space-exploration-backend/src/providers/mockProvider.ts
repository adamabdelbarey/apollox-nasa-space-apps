import { AIProvider, InternalMessage, StreamOptions } from '../types/chat.js';
import { ProviderError, ProviderTimeoutError } from './types.js';

/**
 * Mock streaming AI provider for local testing and frontend development.
 * Produces engaging, educational, and contextual responses without requiring
 * external vendor credentials.
 */
export class MockProvider implements AIProvider {
  public readonly name = 'mock';

  public async *generateStream(
    messages: InternalMessage[],
    options?: StreamOptions
  ): AsyncIterable<string> {
    const signal = options?.signal;

    // Check early abort
    if (signal?.aborted) {
      const error = new Error('Request was aborted');
      error.name = 'AbortError';
      throw error;
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const userPrompt = lastUserMessage?.content || '';

    // Test trigger handlers for automated testing
    if (userPrompt.includes('__TRIGGER_ERROR__')) {
      throw new ProviderError('Simulated provider upstream failure', 'PROVIDER_ERROR', 502);
    }

    if (userPrompt.includes('__TRIGGER_TIMEOUT__')) {
      // Simulate an unresponsive upstream provider until abort signal triggers or 5s max
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => resolve(), 5000);
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timer);
            const err = new Error('The AI provider request timed out');
            err.name = 'AbortError';
            reject(err);
          });
        }
      });
      throw new ProviderTimeoutError('Simulated AI provider timeout');
    }

    if (userPrompt.includes('__TRIGGER_EMPTY__')) {
      // Produces empty response to test empty stream handler
      return;
    }

    // Inspect system prompt or context for spacecraft hints
    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const generatedResponse = this.composeEducationalResponse(userPrompt, systemMessage);

    // Split text into small natural stream chunks
    const chunks = this.chunkText(generatedResponse);

    for (const chunk of chunks) {
      if (signal?.aborted) {
        const error = new Error('Request was aborted');
        error.name = 'AbortError';
        throw error;
      }

      // Small async delay to simulate network token streaming
      await new Promise((resolve) => setTimeout(resolve, 25));

      yield chunk;
    }
  }

  private composeEducationalResponse(prompt: string, systemPrompt: string): string {
    const lower = prompt.toLowerCase();

    // Specific user topic checks first
    if (lower.includes('black hole') || lower.includes('singularity')) {
      return (
        'A black hole is a region in space where matter is packed so densely that gravity is overwhelmingly strong—so strong that nothing, not even light, can escape once it crosses the "event horizon"! ' +
        'Think of rolling a heavy bowling ball onto a soft trampoline; it bends the fabric around it. A black hole bends space and time around itself to an extreme degree!'
      );
    }

    // Check if Opportunity rover or Mars is active in explicit context or prompt
    const hasOpportunity = systemPrompt.includes('**Spacecraft**: Opportunity') || lower.includes('opportunity');
    const hasMars = systemPrompt.includes('**Target Celestial Body**: Mars') || lower.includes('mars');

    if (hasOpportunity && (lower.includes('purpose') || lower.includes('main purpose') || lower.includes('goal'))) {
      return (
        'The Opportunity rover was designed for an extraordinary scientific quest: to search for clues about whether Mars ever had water and conditions suitable for microbial life! ' +
        'Equipped with a robotic arm, microscopic imager, and rock abrasion tool (like a mini-geologist hammer), Opportunity analyzed Martian rocks and soil in Meridiani Planum. ' +
        'Remarkably, it discovered tiny hematite spheres nicknamed "blueberries", proving that liquid water once flowed across the surface of the Red Planet billions of years ago!'
      );
    }

    if (hasOpportunity && (lower.includes('land') || lower.includes('when') || lower.includes('arrive'))) {
      return (
        'Opportunity touched down on Mars in January 2004 inside Eagle Crater! ' +
        'Although originally engineered for a 90-Martian-day (sol) mission, this intrepid rover persevered for nearly 15 years, exploring over 28 miles (45 kilometers) before a giant planet-wide dust storm in 2018 finally blocked sunlight to its solar panels.'
      );
    }

    if (hasMars) {
      return (
        'Mars is often called the Red Planet because iron minerals in its soil oxidize—or rust—making the surface look reddish! ' +
        'Today, Mars is cold and dry with a very thin atmosphere of carbon dioxide. However, ancient river channels, deltas, and minerals found by rovers like Opportunity and Curiosity show us that Mars was once a much warmer, wetter world!'
      );
    }

    if (lower.includes('detail') || lower.includes('how does') || lower.includes('explain')) {
      return (
        `That is a fantastic question! Let's break this down step-by-step: ` +
        `First, in space exploration, scientists and engineers must account for extreme environments—vacuum, severe temperature swings, and radiation. ` +
        `Second, communication travels across vast interplanetary distances at the speed of light, which means radio signals can take minutes or even hours to travel between Earth and robotic spacecraft. ` +
        `That is why modern space probes are equipped with autonomous navigation and smart onboard computers to react to hazards immediately!`
      );
    }

    return (
      `Greetings, fellow space explorer! The cosmos is packed with incredible wonders—from robotic rovers rolling across alien deserts to distant galaxies billions of light-years away. ` +
      `Regarding your question: every space mission is carefully designed by scientists and engineers to unlock secrets about planetary geology, atmospheres, and the origin of life. ` +
      `What specific detail or mission would you like to explore next?`
    );
  }

  private chunkText(text: string): string[] {
    // Break into natural conversational deltas of 1-3 words
    const words = text.split(' ');
    const chunks: string[] = [];
    let current = '';

    for (let i = 0; i < words.length; i++) {
      current += (current ? ' ' : '') + words[i];
      if ((i + 1) % 2 === 0 || i === words.length - 1) {
        chunks.push(current + (i === words.length - 1 ? '' : ' '));
        current = '';
      }
    }

    return chunks.length > 0 ? chunks : [text];
  }
}
