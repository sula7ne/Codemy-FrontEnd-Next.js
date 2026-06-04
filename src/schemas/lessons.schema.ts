import z from "zod";

export const createLessonDto = z.object({
    title: z.string().trim().min(3).max(50),
    theory: z.string().trim().min(3).max(5000),
    order: z.int().min(0).optional(),
}).strict();

export const updateLessonDto = createLessonDto;

export type createLessonDtoType = z.infer<typeof createLessonDto>;
export type updateLessonDtoType = z.infer<typeof updateLessonDto>;