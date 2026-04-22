import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('Classes (e2e)', () => {
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

  describe('GET /api/classes', () => {
    it('returns paginated empty list', async () => {
      const res = await request(app.getHttpServer()).get('/api/classes');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: [],
        metadata: { page: 1, perPage: 20, totalPage: 0, totalItems: 0 },
      });
    });

    it('returns paginated list with classes', async () => {
      await prisma.class.createMany({
        data: [
          { topic: 'LP1', year: 2024, semester: 1 },
          { topic: 'LP2', year: 2024, semester: 2 },
        ],
      });

      const res = await request(app.getHttpServer()).get('/api/classes');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.metadata).toMatchObject({ totalItems: 2 });
    });
  });

  describe('POST /api/classes', () => {
    it('creates a class', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/classes')
        .send({ topic: 'LP1', year: 2024, semester: 1 });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        data: { id: expect.any(String), topic: 'LP1', year: 2024, semester: 1 },
      });
    });
  });

  describe('GET /api/classes/:id', () => {
    it('returns class by id', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });

      const res = await request(app.getHttpServer()).get(`/api/classes/${cls.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: { id: cls.id, topic: 'LP1' } });
    });
  });

  describe('GET /api/classes/:id/students', () => {
    it('returns class with its enrollments', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
      await prisma.classEnrollment.create({ data: { classId: cls.id, studentId: student.id } });

      const res = await request(app.getHttpServer()).get(`/api/classes/${cls.id}/students`);

      expect(res.status).toBe(200);
      expect(res.body.data.enrollments).toHaveLength(1);
      expect(res.body.data.enrollments[0].studentId).toBe(student.id);
    });
  });

  describe('POST /api/classes/:id/enrollments', () => {
    it('enrolls a student in a class', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });

      const res = await request(app.getHttpServer())
        .post(`/api/classes/${cls.id}/enrollments`)
        .send({ studentId: student.id });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        data: { classId: cls.id, studentId: student.id },
      });
    });
  });

  describe('DELETE /api/classes/:id/enrollments/:studentId', () => {
    it('unenrolls a student from a class', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });
      const student = await prisma.student.create({
        data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
      });
      await prisma.classEnrollment.create({ data: { classId: cls.id, studentId: student.id } });

      const res = await request(app.getHttpServer())
        .delete(`/api/classes/${cls.id}/enrollments/${student.id}`);

      expect(res.status).toBe(200);

      const enrollment = await prisma.classEnrollment.findUnique({
        where: { classId_studentId: { classId: cls.id, studentId: student.id } },
      });
      expect(enrollment).toBeNull();
    });
  });

  describe('PUT /api/classes/:id', () => {
    it('updates class topic', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });

      const res = await request(app.getHttpServer())
        .put(`/api/classes/${cls.id}`)
        .send({ topic: 'LP1 Updated' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: { topic: 'LP1 Updated' } });
    });
  });

  describe('DELETE /api/classes/:id', () => {
    it('deletes a class', async () => {
      const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });

      const res = await request(app.getHttpServer()).delete(`/api/classes/${cls.id}`);

      expect(res.status).toBe(200);

      const deleted = await prisma.class.findUnique({ where: { id: cls.id } });
      expect(deleted).toBeNull();
    });
  });
});
