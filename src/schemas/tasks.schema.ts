import { z } from "zod";

const testSchema = z.object({
    type: z.enum(['dom-query', 'js-function']),
    selector: z.string().optional(),
    property: z.string().optional(),
    expectedValue: z.string().optional(),
    code: z.string().optional(),
});

export const createTaskDto = z.object({
    title: z.string().min(1, "Title is required"),
    // order: z.number().optional(),
    test: testSchema
});

export const updateTaskDto = createTaskDto;

export type createTaskDtoType = z.infer<typeof createTaskDto>;
export type updateTaskDtoType = z.infer<typeof updateTaskDto>;