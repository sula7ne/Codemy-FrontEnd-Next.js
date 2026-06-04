import { Course, courseDetails, courseWithDetails } from "@/types/courses";
import { createCourseDtoType, updateCourseDtoType } from "@/schemas/courses.schema";
import { createSectionDtoType, updateSectionDtoType } from "@/schemas/sections.schema";

import { authApi } from "./authApi";

export const coursesApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses'
            })
        }),
        getCoursesWithDetails: build.query<courseDetails[], void>({
            query: () => ({
                url: '/courses/details'
            })
        }),
        getSavedCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses/saved'
            })
        }),
        getMyCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses/my-courses'
            })
        }),
        getCourseById: build.query<courseWithDetails, string>({
            query: (id) => ({
                url: `/courses/${id}`,
            }),
        }),
        
        createCourse: build.mutation<Course, createCourseDtoType>({
            query: (data) => ({
                url: '/courses',
                method: 'POST',
                body: data,
            }),
        }),
        updateCourse: build.mutation<Course, { id: string, data: updateCourseDtoType }>({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        addSection: build.mutation<void, { courseId: string, data: createSectionDtoType }>({
            query: ({ courseId, data }) => ({
                url: `/courses/${courseId}/sections`,
                method: 'POST',
                body: data
            })
        }),
        updateSection: build.mutation<void, { courseId: string, sectionId: string, data: updateSectionDtoType }>({
            query: ({ courseId, sectionId, data }) => ({
                url: `/courses/${courseId}/sections/${sectionId}`,
                method: 'PUT',
                body: data
            })
        })
    })
});

// Don't forget about tags

export const { 
    useGetCoursesQuery, 
    useGetCoursesWithDetailsQuery,
    useGetSavedCoursesQuery,
    useGetMyCoursesQuery,
    useGetCourseByIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useAddSectionMutation,
    useUpdateSectionMutation,
} = coursesApi;