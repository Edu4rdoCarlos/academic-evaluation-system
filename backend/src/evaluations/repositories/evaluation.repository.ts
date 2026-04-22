import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { IEvaluationRepository, UpsertEvaluationData } from './evaluation.repository.interface';
import { Evaluation, EvaluationChangeLog } from '../models/evaluation.model';

@Injectable()
export class EvaluationRepository implements IEvaluationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByClass(classId: string): Promise<Evaluation[]> {
    return this.prisma.evaluation.findMany({ where: { classId } });
  }

  findByClassAndStudent(classId: string, studentId: string): Promise<Evaluation[]> {
    return this.prisma.evaluation.findMany({ where: { classId, studentId } });
  }

  async upsert(data: UpsertEvaluationData): Promise<{ evaluation: Evaluation; changeLog: EvaluationChangeLog }> {
    const existing = await this.prisma.evaluation.findUnique({
      where: { classId_studentId_goalId: { classId: data.classId, studentId: data.studentId, goalId: data.goalId } },
    });

    const evaluation = await this.prisma.evaluation.upsert({
      where: { classId_studentId_goalId: { classId: data.classId, studentId: data.studentId, goalId: data.goalId } },
      create: data,
      update: { concept: data.concept },
    });

    const changeLog = await this.prisma.evaluationChangeLog.create({
      data: {
        evaluationId: evaluation.id,
        studentId: data.studentId,
        classId: data.classId,
        goalId: data.goalId,
        oldConcept: existing?.concept ?? null,
        newConcept: data.concept,
      },
    });

    return { evaluation, changeLog };
  }
}
