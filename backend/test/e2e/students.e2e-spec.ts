import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('Students (e2e)', () => {
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

  describe('GET /api/students', () => {
    it('returns paginated empty list', async () => {
      const res = await request(app.getHttpServer()).get('/api/students');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: [],
        metadata: { page: 1, perPage: 20, totalPage: 0, totalItems: 0 },
      });
    });

    it('returns paginated list with students', async () => {
      await prisma.student.createMany({
        data: [
          { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
          { name: 'Bob', cpf: '22222222222', email: 'bob@test.com' },
        ],
      });

      const res = await request(app.getHttpServer()).get('/api/students?page=1&perPage=10');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.metadata).toMatchObject({ page: 1, perPage: 10, totalItems: 2 });
    });

    it('respects pagination params', async () => {
      await prisma.student.createMany({
        data: Array.from({ length: 5 }, (_, i) => ({
          name: `Student ${i}`,
          cpf: `0000000000${i}`,
          email: `s${i}@test.com`,
        })),
      });

      const res = await request(app.getHttpServer()).get('/api/students?page=2&perPage=2');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.metadata).toMatchObject({ page: 2, perPage: 2, totalItems: 5, totalPage: 3 });
    });
  });

  describe('POST /api/students', () => {
    it('creates a student and returns wrapped data', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/students')
        .send({ name: 'Alice', cpf: '11111111111', email: 'alice@test.com' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        data: { id: expect.any(String), name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
    });
  });

  describe('GET /api/students/:id', () => {
    it('returns student by id', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });

      const res = await request(app.getHttpServer()).get(`/api/students/${student.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: { id: student.id, name: 'Alice' } });
    });

    it('returns data: null when student does not exist', async () => {
      const res = await request(app.getHttpServer()).get('/api/students/00000000-0000-0000-0000-000000000000');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: null });
    });
  });

  describe('PUT /api/students/:id', () => {
    it('updates student name', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });

      const res = await request(app.getHttpServer())
        .put(`/api/students/${student.id}`)
        .send({ name: 'Alice Updated' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: { name: 'Alice Updated' } });
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('deletes student and returns 200', async () => {
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });

      const res = await request(app.getHttpServer()).delete(`/api/students/${student.id}`);

      expect(res.status).toBe(200);

      const deleted = await prisma.student.findUnique({ where: { id: student.id } });
      expect(deleted).toBeNull();
    });
  });
});
