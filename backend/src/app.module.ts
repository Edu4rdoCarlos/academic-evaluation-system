import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { GoalsModule } from './goals/goals.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { EmailDigestModule } from './email-digest/email-digest.module';
import { ApiKeyMiddleware } from './shared/middleware/api-key.middleware';

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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
