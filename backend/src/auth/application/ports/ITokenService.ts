export interface TokenPayload {
  readonly sub: string;
  readonly name: string;
  readonly email: string;
}

export const ITokenService = Symbol('ITokenService');

export interface ITokenService {
  sign(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
