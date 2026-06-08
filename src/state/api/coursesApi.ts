import { Course, courseDetails, courseWithDetails } from "@/types/courses";
import { createCourseDtoType, updateCourseDtoType } from "@/schemas/courses.schema";
import { createSectionDtoType, updateSectionDtoType } from "@/schemas/sections.schema";

import { authApi } from "./authApi";

export const coursesApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses'
            }),
            providesTags: (result) => result
                ? [
                    { type: 'Course', id: 'LIST' },
                    ...result.map(({ id }) => ({ type: 'Course' as const, id })),
                ]
                : [{ type: 'Course', id: 'LIST' }],
        }),
        getCoursesWithDetails: build.query<courseDetails[], void>({
            query: () => ({
                url: '/courses/details'
            }),
            providesTags: (result) => result
                ? [
                    { type: 'Course', id: 'DETAILS_LIST' },
                    ...result.map(({ id }) => ({ type: 'Course' as const, id })),
                ]
                : [{ type: 'Course', id: 'DETAILS_LIST' }],
        }),
        getSavedCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses/saved'
            }),
            providesTags: (result) => result
                ? [
                    { type: 'Course', id: 'SAVED_LIST' },
                    ...result.map(({ id }) => ({ type: 'Course' as const, id })),
                ]
                : [{ type: 'Course', id: 'SAVED_LIST' }],
        }),
        getMyCourses: build.query<Course[], void>({
            query: () => ({
                url: '/courses/my-courses'
            }),
            providesTags: (result) => result
                ? [
                    { type: 'Course', id: 'MY_LIST' },
                    ...result.map(({ id }) => ({ type: 'Course' as const, id })),
                ]
                : [{ type: 'Course', id: 'MY_LIST' }],
        }),
        getCourseById: build.query<courseWithDetails, string>({
            query: (id) => ({
                url: `/courses/${id}`,
            }),
            providesTags: (result, error, id) => [
                { type: 'Course', id },
                ...(result?.sections || []).map((section) => ({ type: 'Section' as const, id: section.id })),
            ],
        }),
        
        createCourse: build.mutation<Course, createCourseDtoType>({
            query: (data) => ({
                url: '/courses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [
                { type: 'Course', id: 'LIST' },
                { type: 'Course', id: 'DETAILS_LIST' },
                { type: 'Course', id: 'MY_LIST' },
                { type: 'User', id: 'ME' },
            ],
        }),
        updateCourse: build.mutation<Course, { id: string, data: updateCourseDtoType }>({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Course', id },
                { type: 'Course', id: 'LIST' },
                { type: 'Course', id: 'DETAILS_LIST' },
                { type: 'Course', id: 'MY_LIST' },
                { type: 'Course', id: 'SAVED_LIST' },
            ],
        }),

        addSection: build.mutation<void, { courseId: string, data: createSectionDtoType }>({
            query: ({ courseId, data }) => ({
                url: `/courses/${courseId}/sections`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { courseId }) => [
                { type: 'Course', id: courseId },
                { type: 'Course', id: 'DETAILS_LIST' },
                { type: 'Section', id: 'LIST' },
            ],
        }),
        updateSection: build.mutation<void, { courseId: string, sectionId: string, data: updateSectionDtoType }>({
            query: ({ courseId, sectionId, data }) => ({
                url: `/courses/${courseId}/sections/${sectionId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { courseId, sectionId }) => [
                { type: 'Course', id: courseId },
                { type: 'Course', id: 'DETAILS_LIST' },
                { type: 'Section', id: sectionId },
            ],
        })
    })
});

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
