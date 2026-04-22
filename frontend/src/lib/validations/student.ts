import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().length(11),
  email: z.string().email(),
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
