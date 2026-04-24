import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { userCourse } from "@/types/course";
import { userCourses } from "@/data/userCourses";

type course = {
    courseId: string, 
    lastLessonId: string
}

const initialState = userCourses;

const userCoursesSlice = createSlice({
    name: "userCourses",
    initialState,
    reducers: {
        startCourse: (state, action: PayloadAction<course>) => {
            const { courseId, lastLessonId } = action.payload;
            const course = state.some(el => el.courseId === courseId);
            
            if(!course) {
                state.unshift({
                    courseId,
                    progress: 0,
                    lastLessonId
                });
            }
        },
        updateCourse: (state, action: PayloadAction<userCourse>) => {
            const { courseId, progress, lastLessonId } = action.payload;
            const course = state.find(el => el.courseId === courseId);
            
            if (course) {
                course.progress = progress;
                course.lastLessonId = lastLessonId;
            }
        }
    }
});

export const { startCourse, updateCourse } = userCoursesSlice.actions;
export default userCoursesSlice.reducer;

