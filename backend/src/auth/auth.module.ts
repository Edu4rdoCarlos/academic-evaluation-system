import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { IAuthUserRepository } from './application/ports/IAuthUserRepository';
import { ITokenService } from './application/ports/ITokenService';
import { Login } from './application/use-cases/Login';
import { PrismaAuthUserRepository } from './infrastructure/persistence/PrismaAuthUserRepository';
import { JwtTokenService } from './infrastructure/jwt/JwtTokenService';
import { JwtAuthGuard } from './infrastructure/guards/JwtAuthGuard';
import { AuthController } from './presentation/http/AuthController';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    Login,
    { provide: IAuthUserRepository, useClass: PrismaAuthUserRepository },
    { provide: ITokenService, useClass: JwtTokenService },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [ITokenService],
})
export class AuthModule {}
