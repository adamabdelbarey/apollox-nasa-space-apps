import { Router, Request, Response } from 'express';
import { ChatService } from '../services/chatService.js';

export function createHealthRouter(chatService: ChatService): Router {
  const router = Router();

  router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'space-exploration-chatbot-backend',
      provider: chatService.providerName,
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}
