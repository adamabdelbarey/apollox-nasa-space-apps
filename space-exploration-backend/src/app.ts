import express, { Express, Request, Response, NextFunction } from 'express';
import { EnvConfig } from './config/env.js';
import { createAIProvider } from './providers/factory.js';
import { ChatService } from './services/chatService.js';
import { ChatController } from './controllers/chatController.js';
import { createChatRouter } from './routes/chatRoutes.js';
import { createHealthRouter } from './routes/healthRoutes.js';
import { corsMiddleware } from './middleware/cors.js';
import { RateLimiter } from './middleware/rateLimiter.js';
import { AIProvider } from './types/chat.js';

export interface AppDependencies {
  envConfig: EnvConfig;
  customProvider?: AIProvider;
}

export function createApp(dependencies: AppDependencies): Express {
  const app = express();
  const { envConfig, customProvider } = dependencies;

  // 1. Core security & body parsing middleware
  app.disable('x-powered-by');

  // Strict request body size limit to prevent payload flooding
  app.use(express.json({ limit: '100kb' }));

  // CORS restriction to frontend origin
  app.use(corsMiddleware);

  // Rate limiting to prevent API abuse
  const rateLimiter = new RateLimiter(envConfig.RATE_LIMIT_WINDOW_MS, envConfig.RATE_LIMIT_MAX_REQUESTS);
  app.use(rateLimiter.middleware());

  // 2. Instantiate provider and services
  const provider = customProvider || createAIProvider(envConfig);
  const chatService = new ChatService(provider);
  const chatController = new ChatController(chatService);

  // 3. Mount API v1 routes
  const apiRouter = express.Router();
  apiRouter.use(createChatRouter(chatController));
  apiRouter.use(createHealthRouter(chatService));

  app.use('/api/v1', apiRouter);

  // Root welcome / health ping
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      name: 'Educational Space Exploration AI API',
      status: 'active',
      docs: '/api/v1/health',
      endpoint: 'POST /api/v1/chat',
    });
  });

  // 4. Handle 404 Not Found
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      code: 'NOT_FOUND',
      message: 'The requested API route does not exist.',
    });
  });

  // 5. Global safe error handling middleware (never leaks stack traces or credentials)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Handle body-parser JSON syntax error
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({
        code: 'MALFORMED_JSON',
        message: 'The request body could not be parsed as valid JSON.',
      });
      return;
    }

    // Handle payload too large
    if (err.type === 'entity.too.large') {
      res.status(413).json({
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request payload exceeded maximum size limit of 100KB.',
      });
      return;
    }

    console.error('Unhandled server error:', err.message || err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal error occurred.',
    });
  });

  return app;
}
