import { readCollection, writeCollection } from "@/server/db/json-db";
import type { Evaluation } from "@/lib/types";

const COLLECTION = "evaluations";

export class EvaluationRepository {
  async findAll(): Promise<Evaluation[]> {
    return readCollection<Evaluation>(COLLECTION);
  }

  async findByClass(classId: string): Promise<Evaluation[]> {
    const all = await this.findAll();
    return all.filter((e) => e.classId === classId);
  }

  async upsert(evaluation: Evaluation): Promise<void> {
    const all = await this.findAll();
    const index = all.findIndex(
      (e) => e.classId === evaluation.classId && e.studentId === evaluation.studentId && e.goal === evaluation.goal
    );
    if (index >= 0) {
      all[index] = evaluation;
    } else {
      all.push(evaluation);
    }
    await writeCollection(COLLECTION, all);
  }
}
