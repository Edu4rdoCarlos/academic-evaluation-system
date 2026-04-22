import { randomUUID } from "crypto";
import { EvaluationRepository } from "@/server/repositories/evaluation-repository";
import type { Evaluation } from "@/lib/types";
import type { UpsertEvaluationInput } from "@/lib/validations/evaluation";

export class EvaluationService {
  private readonly repo = new EvaluationRepository();

  async listAll(): Promise<Evaluation[]> {
    return this.repo.findAll();
  }

  async listByClass(classId: string): Promise<Evaluation[]> {
    return this.repo.findByClass(classId);
  }

  async upsert(data: UpsertEvaluationInput): Promise<Evaluation> {
    const existing = (await this.repo.findAll()).find(
      (e) => e.classId === data.classId && e.studentId === data.studentId && e.goal === data.goal
    );

    const evaluation: Evaluation = {
      id: existing?.id ?? randomUUID(),
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await this.repo.upsert(evaluation);
    return evaluation;
  }
}
