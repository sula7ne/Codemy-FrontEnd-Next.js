import { CreateFile, CreateUserFile, Lesson, LessonWithDetails } from "@/types/lessons";

import { authApi } from "./authApi";

export const lessonsApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getLessonByIdQuery: build.query<Lesson, string>({
            query: (id) => ({
                url: `/lessons/${id}`,
            }),
            providesTags: (result, error, id) => [
                { type: 'Lesson', id },
                { type: 'File', id: `LESSON:${id}` },
            ],
        }),
        getLessonByIdQueryWithDetails: build.query<LessonWithDetails, string>({
            query: (id) => ({
                url: `/lessons/${id}/details`,
            }),
            providesTags: (result, error, id) => [
                { type: 'Lesson', id },
                { type: 'File', id: `LESSON:${id}` },
            ],
        }),
        
        createFile: build.mutation<void, { lessonId: string; body: CreateFile }>({
            query: ({ lessonId, body }) => ({
                url: `/lessons/${lessonId}/create/files`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { lessonId }) => [
                { type: 'Lesson', id: lessonId },
                { type: 'File', id: `LESSON:${lessonId}` },
            ],
        }),
        createUserFile: build.mutation<void, { lessonId: string; body: CreateUserFile }>({
            query: ({ lessonId, body }) => ({
                url: `/lessons/${lessonId}/files`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { lessonId }) => [
                { type: 'Lesson', id: lessonId },
                { type: 'File', id: `LESSON:${lessonId}` },
            ],
        }),

        updateFileCode: build.mutation<void, { lessonId: string; body: { path: string, code: string } }>({
            query: ({ lessonId, body }) => ({
                url: `/lessons/${lessonId}/files/code`,
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: (result, error, { lessonId }) => [
            //     { type: 'Lesson', id: lessonId },
            //     { type: 'File', id: `LESSON:${lessonId}` },
            // ],
        }),

        completeTaskStatus: build.mutation<void, { taskId: string; }>({
            query: ({ taskId }) => ({
                url: `/lessons/tasks/${taskId}/complete`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
        }),
    })
});


export const { 
    useGetLessonByIdQueryQuery,
    useGetLessonByIdQueryWithDetailsQuery,
    useCreateFileMutation,
    useCreateUserFileMutation,
    useUpdateFileCodeMutation,
    useCompleteTaskStatusMutation
} = lessonsApi;
