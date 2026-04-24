import activeLessonSlice from "@/state/slices/activeLessonSlice";
import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "@/state/slices/coursesSlice";
import lessonsSlice from "@/state/slices/lessonsSlice";
import savedCoursesSlice from "@/state/slices/savedCoursesSlice";
import sectionsSlice from "@/state/slices/sectionsSlice";
import sidebarSlice from "@/state/slices/ui/sidebarSlice";
import userCoursesSlice from "@/state/slices/userCoursesSlice";

export const store = configureStore({
    reducer: {
        courses: coursesSlice,
        sections: sectionsSlice,
        lessons: lessonsSlice,
        activeLesson: activeLessonSlice,
        savedCourses: savedCoursesSlice,
        userCourses: userCoursesSlice,

        // ui:
        sidebar: sidebarSlice,    
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch