import { z } from "zod";

export const createClassSchema = z.object({
  topic: z.string().min(1),
  year: z.number().int().min(2000),
  semester: z.union([z.literal(1), z.literal(2)]),
  studentIds: z.array(z.string()).default([]),
});

export const updateClassSchema = createClassSchema.partial();

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
