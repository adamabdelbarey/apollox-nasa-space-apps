import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

interface ClientHistory {
  timestamps: number[];
}

export class RateLimiter {
  private readonly hits = new Map<string, ClientHistory>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = env.RATE_LIMIT_WINDOW_MS, maxRequests = env.RATE_LIMIT_MAX_REQUESTS) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Periodic sweep to prevent unbounded memory growth
    const cleanupInterval = Math.max(windowMs, 30000);
    const timer = setInterval(() => this.cleanup(), cleanupInterval);
    if (timer.unref) {
      timer.unref();
    }
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [ip, history] of this.hits.entries()) {
      const valid = history.timestamps.filter((t) => now - t < this.windowMs);
      if (valid.length === 0) {
        this.hits.delete(ip);
      } else {
        history.timestamps = valid;
      }
    }
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      // Extract client identifier (handling proxies if trusted, otherwise socket IP)
      const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        req.socket.remoteAddress ||
        'unknown_client';

      const now = Date.now();
      let record = this.hits.get(clientIp);

      if (!record) {
        record = { timestamps: [] };
        this.hits.set(clientIp, record);
      }

      // Filter out timestamps outside the active sliding window
      record.timestamps = record.timestamps.filter((t) => now - t < this.windowMs);

      if (record.timestamps.length >= this.maxRequests) {
        const oldest = record.timestamps[0];
        const retryAfterSec = Math.ceil((oldest + this.windowMs - now) / 1000);

        res.setHeader('Retry-After', String(Math.max(1, retryAfterSec)));
        res.status(429).json({
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Too many chat requests. Please wait ${retryAfterSec} second(s) before trying again.`,
        });
        return;
      }

      record.timestamps.push(now);
      next();
    };
  }

  public reset(): void {
    this.hits.clear();
  }
}

export const rateLimiter = new RateLimiter();
export const rateLimitMiddleware = rateLimiter.middleware();
