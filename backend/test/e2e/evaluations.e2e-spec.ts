import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp, cleanDatabase } from '../helpers/create-test-app';

describe('Evaluations (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;

  let classId: string;
  let studentId: string;
  let goalId: string;

  beforeAll(async () => {
    ({ app, prisma, authToken } = await createTestApp());
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);

    const cls = await prisma.class.create({ data: { topic: 'LP1', year: 2024, semester: 1 } });
    const student = await prisma.student.create({
      data: { name: 'Alice', cpf: '11111111111', email: 'alice@test.com' },
    });
    const goal = await prisma.goal.create({ data: { name: 'Requisitos' } });
    await prisma.classEnrollment.create({ data: { classId: cls.id, studentId: student.id } });

    classId = cls.id;
    studentId = student.id;
    goalId = goal.id;
  });

  afterAll(async () => {
    await cleanDatabase(prisma);
    await app.close();
  });

  describe('GET /api/evaluations/class/:classId', () => {
    it('returns empty list when no evaluations exist', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/evaluations/class/${classId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ data: [] });
    });

    it('returns evaluations for the class', async () => {
      await prisma.evaluation.create({
        data: { classId, studentId, goalId, concept: 'MA' },
      });

      const res = await request(app.getHttpServer())
        .get(`/api/evaluations/class/${classId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toMatchObject({ classId, studentId, goalId, concept: 'MA' });
    });
  });

  describe('POST /api/evaluations', () => {
    it('creates an evaluation and returns wrapped data with changeLog', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/evaluations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ classId, studentId, goalId, concept: 'MPA' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        data: {
          evaluation: { classId, studentId, goalId, concept: 'MPA' },
          changeLog: { oldConcept: null, newConcept: 'MPA' },
        },
      });
    });

    it('updates an existing evaluation (upsert) and logs the change', async () => {
      await prisma.evaluation.create({ data: { classId, studentId, goalId, concept: 'MANA' } });

      const res = await request(app.getHttpServer())
        .post('/api/evaluations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ classId, studentId, goalId, concept: 'MA' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        data: {
          evaluation: { concept: 'MA' },
          changeLog: { oldConcept: 'MANA', newConcept: 'MA' },
        },
      });
    });
  });
});
