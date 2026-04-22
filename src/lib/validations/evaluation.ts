import { z } from "zod";

export const upsertEvaluationSchema = z.object({
  classId: z.string().min(1),
  studentId: z.string().min(1),
  goal: z.string().min(1),
  concept: z.enum(["MANA", "MPA", "MA"]),
});

export type UpsertEvaluationInput = z.infer<typeof upsertEvaluationSchema>;
