import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('EmailDigest (e2e)', () => {
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

  describe('GET /api/email-digest/pending', () => {
    it('returns empty list when no pending digests exist', async () => {
      const res = await request(app.getHttpServer()).get('/api/email-digest/pending');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: [] });
    });

    it('returns pending digests', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
      await prisma.dailyEmailDigest.create({
        data: { studentId: student.id, digestDate: new Date(), status: 'pending' },
      });

      const res = await request(app.getHttpServer()).get('/api/email-digest/pending');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toMatchObject({ status: 'pending', studentId: student.id });
    });

    it('does not return sent digests', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
      await prisma.dailyEmailDigest.create({
        data: {
          studentId: student.id,
          digestDate: new Date(),
          status: 'sent',
          sentAt: new Date(),
        },
      });

      const res = await request(app.getHttpServer()).get('/api/email-digest/pending');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(0);
    });
  });

  describe('POST /api/email-digest/:id/send', () => {
    it('marks a digest as sent', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
      const digest = await prisma.dailyEmailDigest.create({
        data: { studentId: student.id, digestDate: new Date(), status: 'pending' },
      });

      const res = await request(app.getHttpServer()).post(`/api/email-digest/${digest.id}/send`);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ data: { id: digest.id, status: 'sent' } });
      expect(res.body.data.sentAt).not.toBeNull();
    });
  });
});
