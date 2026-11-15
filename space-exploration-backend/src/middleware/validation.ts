import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant'], {
    errorMap: () => ({ message: "Message role must be strictly 'user' or 'assistant'. System role or custom roles are forbidden." }),
  }),
  content: z
    .string({ required_error: 'Message content string is required' })
    .min(1, 'Message content cannot be empty')
    .max(4000, 'Message content exceeds the 4,000 character limit')
    .refine((val) => val.trim().length > 0, {
      message: 'Message content cannot consist solely of whitespace',
    }),
});

const spacecraftContextSchema = z
  .object({
    spacecraftId: z.string().max(100).optional(),
    spacecraftName: z.string().max(100).optional(),
    celestialBody: z.string().max(100).optional(),
    missionName: z.string().max(100).optional(),
    missionFacts: z
      .array(
        z
          .string()
          .max(1000, 'Individual mission fact exceeds 1,000 characters')
          .refine((val) => val.trim().length > 0, { message: 'Mission fact cannot be blank' })
      )
      .max(50, 'Exceeded maximum of 50 mission facts')
      .optional(),
  })
  .strict()
  .optional();

export const chatRequestSchema = z
  .object({
    conversationId: z
      .string({ required_error: 'conversationId is required' })
      .min(1, 'conversationId cannot be empty')
      .max(100, 'conversationId exceeds maximum length of 100 characters'),
    messages: z
      .array(chatMessageSchema, { required_error: 'messages array is required' })
      .min(1, 'At least one message is required in messages array')
      .max(50, 'Conversation history cannot exceed 50 messages'),
    context: spacecraftContextSchema,
  })
  .strict();

/**
 * Middleware that strictly validates the incoming chat request body.
 * Rejects unsupported roles, oversized payloads, extra unknown fields,
 * or malformed structures before reaching the controller.
 */
export function validateChatRequest(req: Request, res: Response, next: NextFunction): void {
  const result = chatRequestSchema.safeParse(req.body);

  if (!result.success) {
    const errorDetails = result.error.errors.map((e) => {
      const fieldPath = e.path.join('.');
      return fieldPath ? `${fieldPath}: ${e.message}` : e.message;
    });

    res.status(400).json({
      code: 'INVALID_REQUEST',
      message: 'The request body is malformed or violates validation constraints.',
      details: errorDetails,
    });
    return;
  }

  // Assign validated and sanitized body
  req.body = result.data;
  next();
}
