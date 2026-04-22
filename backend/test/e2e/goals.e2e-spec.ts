import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('Goals (e2e)', () => {
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

  describe('GET /api/goals', () => {
    it('returns empty list when no goals exist', async () => {
      const res = await request(app.getHttpServer()).get('/api/goals');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: [] });
    });

    it('returns list of goals', async () => {
      await prisma.goal.createMany({
        data: [{ name: 'Requisitos' }, { name: 'Testes' }],
      });

      const res = await request(app.getHttpServer()).get('/api/goals');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0]).toMatchObject({ id: expect.any(String), name: expect.any(String) });
    });
  });

  describe('POST /api/goals', () => {
    it('creates a goal', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/goals')
        .send({ name: 'Implementação' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ data: { id: expect.any(String), name: 'Implementação' } });
    });
  });

  describe('DELETE /api/goals/:id', () => {
    it('deletes a goal', async () => {
      const goal = await prisma.goal.create({ data: { name: 'Requisitos' } });

      const res = await request(app.getHttpServer()).delete(`/api/goals/${goal.id}`);

      expect(res.status).toBe(200);

      const deleted = await prisma.goal.findUnique({ where: { id: goal.id } });
      expect(deleted).toBeNull();
    });
  });
});
