import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser, IAuthUserRepository } from '../../application/ports/IAuthUserRepository';

@Injectable()
export class PrismaAuthUserRepository implements IAuthUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };
  }
}
