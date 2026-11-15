import { env } from './config/env.js';
import { createApp } from './app.js';

const app = createApp({ envConfig: env });

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Space Exploration AI Backend running in "${env.NODE_ENV}" mode`);
  console.log(`📡 Server listening on: http://localhost:${env.PORT}`);
  console.log(`🪐 Chat Endpoint: POST http://localhost:${env.PORT}/api/v1/chat`);
  console.log(`🤖 Active AI Provider: [${env.AI_PROVIDER}]`);
  console.log(`🌐 Allowed Frontend Origin: ${env.FRONTEND_URL}`);
});

function handleGracefulShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close after 10s if connections linger
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
