import { z } from 'zod';

export const upsertEvaluationSchema = z.object({
  classId: z.string().uuid(),
  studentId: z.string().uuid(),
  goalId: z.string().uuid(),
  concept: z.enum(['MANA', 'MPA', 'MA']),
});

export type UpsertEvaluationInput = z.infer<typeof upsertEvaluationSchema>;
