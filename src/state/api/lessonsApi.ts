import { CreateFile, CreateUserFile, Lesson, LessonWithDetails } from "@/types/lessons";

import { authApi } from "./authApi";
import { createTaskDtoType } from "@/schemas/tasks.schema";

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
        deleteLesson: build.mutation<void, { id: string, sectionId: string }>({
            query: ({ id }) => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id, sectionId }) => [
                { type: 'Section', id: sectionId },
                { type: 'Lesson', id },
                { type: 'Course', id: 'DETAILS_LIST' },
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
        createTask: build.mutation<void, { lessonId: string; body: createTaskDtoType }>({
            query: ({ lessonId, body }) => ({
                url: `/lessons/${lessonId}/tasks`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { lessonId }) => [
                { type: 'Lesson', id: lessonId },
                { type: 'Task', id: `LESSON:${lessonId}` }, 
            ],
        }),
        editTask: build.mutation<void, { lessonId: string, taskId: string; body: createTaskDtoType }>({
            query: ({ taskId, body }) => ({
                url: `/lessons/tasks/${taskId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { lessonId, taskId }) => [
                { type: 'Lesson', id: lessonId },
                { type: 'Task', id: taskId }
            ],
        }),
        deleteTask: build.mutation<void, { lessonId: string, taskId: string; }>({
            query: ({ taskId }) => ({
                url: `/lessons/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { lessonId, taskId }) => [
                { type: 'Lesson', id: lessonId },
                { type: 'Task', id: taskId }
            ],
        }),
    })
});


export const { 
    useGetLessonByIdQueryQuery,
    useGetLessonByIdQueryWithDetailsQuery,
    useDeleteLessonMutation,
    useCreateFileMutation,
    useCreateUserFileMutation,
    useUpdateFileCodeMutation,
    useCompleteTaskStatusMutation,
    useCreateTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
} = lessonsApi;
