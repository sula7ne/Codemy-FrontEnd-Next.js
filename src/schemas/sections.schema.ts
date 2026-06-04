import z from "zod";

export const createSectionDto = z.object({
    title: z.string().trim().min(3).max(50),
    description: z.string().trim().min(3).max(300),
    order: z.int().min(0).optional()
}).strict();

export const updateSectionDto = createSectionDto;

export type createSectionDtoType = z.infer<typeof createSectionDto>;
export type updateSectionDtoType = z.infer<typeof updateSectionDto>;