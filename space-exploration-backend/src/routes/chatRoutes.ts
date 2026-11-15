import { Router } from 'express';
import { ChatController } from '../controllers/chatController.js';
import { validateChatRequest } from '../middleware/validation.js';

export function createChatRouter(chatController: ChatController): Router {
  const router = Router();

  router.post('/chat', validateChatRequest, chatController.handleChat);

  return router;
}
