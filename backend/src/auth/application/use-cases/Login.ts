import { Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { IAuthUserRepository } from '../ports/IAuthUserRepository';
import { ITokenService } from '../ports/ITokenService';
import { InvalidCredentials } from '../../domain/errors/InvalidCredentials';

export interface LoginInput {
  readonly email: string;
  readonly password: string;
}

export interface LoginOutput {
  readonly accessToken: string;
}

@Injectable()
export class Login {
  constructor(
    @Inject(IAuthUserRepository)
    private readonly userRepository: IAuthUserRepository,
    @Inject(ITokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user || !compareSync(input.password, user.passwordHash)) {
      throw new InvalidCredentials();
    }

    const accessToken = this.tokenService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return { accessToken };
  }
}
