import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);
  });

  afterAll(async () => {
    await cleanDatabase(prisma);
    await app.close();
  });

  describe('POST /api/auth/login', () => {
    it('returns a JWT access token on valid credentials', async () => {
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@test.com',
          passwordHash: hashSync('secret123', 10),
          role: 'ADMIN',
        },
      });

      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'secret123' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ accessToken: expect.any(String) });
    });

    it('returns 401 when password is wrong', async () => {
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@test.com',
          passwordHash: hashSync('secret123', 10),
          role: 'ADMIN',
        },
      });

      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'wrongpassword' });

      expect(res.status).toBe(401);
    });

    it('returns 401 when email does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'whatever' });

      expect(res.status).toBe(401);
    });

    it('returns 400 when email is not valid', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'not-an-email', password: 'secret123' });

      expect(res.status).toBe(400);
    });
  });
});
