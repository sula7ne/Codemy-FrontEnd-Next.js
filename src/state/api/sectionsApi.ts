import { createLessonDtoType, updateLessonDtoType } from "@/schemas/lessons.schema";

import { authApi } from "./authApi";

export const sectionsApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        addLesson: build.mutation<void, { sectionId: string, data: createLessonDtoType }>({
            query: ({ sectionId, data }) => ({
                url: `/sections/${sectionId}/lessons`,
                method: 'POST',
                body: data
            })
        }),
        updateLesson: build.mutation<void, { sectionId: string, lessonId: string, data: updateLessonDtoType }>({
            query: ({ sectionId, lessonId, data }) => ({
                url: `/sections/${sectionId}/lessons/${lessonId}`,
                method: 'PUT',
                body: data
            })
        })
    })
});

// Don't forget about tags

export const {
    useAddLessonMutation,
    useUpdateLessonMutation,
} = sectionsApi;