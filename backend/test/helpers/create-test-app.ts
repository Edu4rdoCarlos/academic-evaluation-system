import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EmailService } from '../../src/email/email.service';

export interface TestApp {
  app: INestApplication;
  prisma: PrismaService;
  authToken: string;
  emailMock: jest.Mocked<Pick<EmailService, 'send'>>;
}

export async function createTestApp(): Promise<TestApp> {
  const emailMock = { send: jest.fn().mockResolvedValue(undefined) };

  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(EmailService)
    .useValue(emailMock)
    .compile();

  const app = module.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  await app.init();

  const prisma = module.get(PrismaService);
  const jwtService = module.get(JwtService);

  const authToken = jwtService.sign({
    sub: '00000000-0000-0000-0000-000000000001',
    name: 'Test User',
    email: 'test@test.com',
  });

  return { app, prisma, authToken, emailMock };
}

export async function cleanDatabase(prisma: PrismaService): Promise<void> {
  await prisma.$transaction([
    prisma.dailyEmailDigestItem.deleteMany(),
    prisma.dailyEmailDigest.deleteMany(),
    prisma.evaluationChangeLog.deleteMany(),
    prisma.evaluation.deleteMany(),
    prisma.classEnrollment.deleteMany(),
    prisma.class.deleteMany(),
    prisma.student.deleteMany(),
    prisma.goal.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
