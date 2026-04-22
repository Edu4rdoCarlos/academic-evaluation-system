import { Evaluation, EvaluationChangeLog, EvaluationConcept } from '../models/evaluation.model';

export interface UpsertEvaluationData {
  classId: string;
  studentId: string;
  goalId: string;
  concept: EvaluationConcept;
}

export interface IEvaluationRepository {
  findByClass(classId: string): Promise<Evaluation[]>;
  findByClassAndStudent(classId: string, studentId: string): Promise<Evaluation[]>;
  upsert(data: UpsertEvaluationData): Promise<{ evaluation: Evaluation; changeLog: EvaluationChangeLog }>;
}

export const EVALUATION_REPOSITORY = Symbol('EVALUATION_REPOSITORY');
