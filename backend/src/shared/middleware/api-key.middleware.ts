import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

function isLocalhost(req: Request): boolean {
  const ip = req.ip ?? req.socket.remoteAddress ?? '';
  return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
}

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, _res: Response, next: NextFunction): void {
    if (isLocalhost(req) || req.path === '/api/health') {
      return next();
    }

    const provided = req.headers['x-api-key'];
    const expected = this.config.getOrThrow<string>('API_KEY');

    if (provided !== expected) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    next();
  }
}
