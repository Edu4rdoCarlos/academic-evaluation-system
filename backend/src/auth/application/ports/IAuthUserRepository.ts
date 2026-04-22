export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
}

export const IAuthUserRepository = Symbol('IAuthUserRepository');

export interface IAuthUserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
}
