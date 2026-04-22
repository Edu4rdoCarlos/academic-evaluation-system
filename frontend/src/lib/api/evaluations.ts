import { get, post } from './client';
import type { Evaluation } from '@/lib/types';
import type { UpsertEvaluationInput } from '@/lib/validations/evaluation';

export function fetchEvaluationsByClass(classId: string): Promise<Evaluation[]> {
  return get(`/evaluations/class/${classId}`);
}

export function upsertEvaluation(data: UpsertEvaluationInput): Promise<Evaluation> {
  return post('/evaluations', data);
}
