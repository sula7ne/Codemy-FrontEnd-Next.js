import z from "zod";

export const registerDto = z.object({
    email: z.email(),
    username: z.string().trim().min(3).max(20),
    password: z.string().min(6),
}).strict();

export const loginDto = z.object({
    email: z.email(),
    // username: z.string().trim().min(3).max(20),
    password: z.string().min(6),
}).strict();

export type registerDtoType = z.infer<typeof registerDto>;
export type loginDtoType = z.infer<typeof loginDto>;