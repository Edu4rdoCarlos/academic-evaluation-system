import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from '../../application/ports/ITokenService';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest<Request & { user: TokenPayload }>();
    return request.user;
  },
);
