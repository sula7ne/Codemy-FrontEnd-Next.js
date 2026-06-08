import { createLessonDtoType, updateLessonDtoType } from "@/schemas/lessons.schema";

import { Lesson } from "@/types/courses";
import { Section } from "@/types/sections";
import { authApi } from "./authApi";

export const sectionsApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getSectionByIdQuery: build.query<Section, string>({
            query: (id) => ({
                url: `/sections/${id}`,
            }),
            providesTags: (result, error, id) => [
                { type: 'Section', id },
                ...(result?.lessons || []).map((lesson) => ({ type: 'Lesson' as const, id: lesson.id })),
            ],
        }),
                
        addLesson: build.mutation<Lesson, { sectionId: string, data: createLessonDtoType }>({
            query: ({ sectionId, data }) => ({
                url: `/sections/${sectionId}/lessons`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { sectionId }) => [
                { type: 'Section', id: sectionId },
                { type: 'Lesson', id: 'LIST' },
                { type: 'Course', id: 'DETAILS_LIST' },
            ],
        }),
        updateLesson: build.mutation<Lesson, { sectionId: string, lessonId: string, data: updateLessonDtoType }>({
            query: ({ sectionId, lessonId, data }) => ({
                url: `/sections/${sectionId}/lessons/${lessonId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { sectionId, lessonId }) => [
                { type: 'Section', id: sectionId },
                { type: 'Lesson', id: lessonId },
                { type: 'Course', id: 'DETAILS_LIST' },
            ],
        })
    })
});

export const {
    useGetSectionByIdQueryQuery,
    useAddLessonMutation,
    useUpdateLessonMutation,
} = sectionsApi;
