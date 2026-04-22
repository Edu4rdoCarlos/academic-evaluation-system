import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { GoalsModule } from './goals/goals.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { EmailDigestModule } from './email-digest/email-digest.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../database/.env'],
    }),
    PrismaModule,
    StudentsModule,
    ClassesModule,
    GoalsModule,
    EvaluationsModule,
    EmailDigestModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
