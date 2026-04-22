import { z } from 'zod';

export const createClassSchema = z.object({
  topic: z.string().min(1, 'Tópico é obrigatório'),
  year: z.number().int().min(1900),
  semester: z.union([z.literal(1), z.literal(2)]),
});

export const updateClassSchema = createClassSchema.partial();

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
