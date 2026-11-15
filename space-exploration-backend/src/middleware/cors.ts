import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

/**
 * Strict CORS middleware restricting browser access to the configured frontend origin.
 */
export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;
  const allowedOrigin = env.FRONTEND_URL;

  // If no Origin header is sent (e.g. server-to-server or curl), allow through
  if (!origin) {
    next();
    return;
  }

  // Check if origin matches configured allowed origin or local dev origin
  const isDevLocalhost = env.NODE_ENV === 'development' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin === allowedOrigin || allowedOrigin === '*' || isDevLocalhost) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Vary', 'Origin');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    next();
    return;
  }

  // If Origin does not match, reject preflight or return 403
  if (req.method === 'OPTIONS') {
    res.status(403).json({
      code: 'CORS_FORBIDDEN',
      message: `Origin ${origin} is not permitted by CORS policy.`,
    });
    return;
  }

  res.status(403).json({
    code: 'CORS_FORBIDDEN',
    message: `Origin ${origin} is not permitted by CORS policy.`,
  });
}
