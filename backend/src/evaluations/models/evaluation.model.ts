import { EvaluationConcept } from '@prisma/client';

export { EvaluationConcept };

export class Evaluation {
  readonly id: string;
  readonly classId: string;
  readonly studentId: string;
  readonly goalId: string;
  readonly concept: EvaluationConcept;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class EvaluationChangeLog {
  readonly id: string;
  readonly evaluationId: string;
  readonly studentId: string;
  readonly classId: string;
  readonly goalId: string;
  readonly oldConcept: EvaluationConcept | null;
  readonly newConcept: EvaluationConcept;
  readonly changedAt: Date;
}
