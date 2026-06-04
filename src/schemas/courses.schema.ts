import z from "zod";

export const createCourseDto = z.object({
    title: z.string().trim().min(3).max(50),
    description: z.string().trim().min(3).max(1000),
    cover: z.url(),
    time: z.string().trim().min(3),
    level: z.string().trim().min(3),
    language: z.string().trim().min(2)
}).strict();

export const updateCourseDto = createCourseDto;

export type createCourseDtoType = z.infer<typeof createCourseDto>;
export type updateCourseDtoType = z.infer<typeof updateCourseDto>;