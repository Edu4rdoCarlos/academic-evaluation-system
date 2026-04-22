import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ITokenService, TokenPayload } from '../../application/ports/ITokenService';
import { IS_PUBLIC_KEY } from '../decorators/Public';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ITokenService)
    private readonly tokenService: ITokenService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request & { user?: TokenPayload }>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException('Missing bearer token');

    try {
      request.user = this.tokenService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
