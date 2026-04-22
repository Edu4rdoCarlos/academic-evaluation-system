import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EmailService } from '../../src/email/email.service';

export interface TestApp {
  app: INestApplication;
  prisma: PrismaService;
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
  await app.init();

  const prisma = module.get(PrismaService);

  return { app, prisma, emailMock };
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
  ]);
}
