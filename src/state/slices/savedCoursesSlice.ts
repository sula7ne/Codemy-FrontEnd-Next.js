import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [
    "2"
];

const savedCoursesSlice = createSlice({
    name: "savedCourses",
    initialState,
    reducers: {
        toggleSavedCourse: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            const index = state.indexOf(courseId);
            
            if(index !== -1) {
                state.splice(index, 1);
            } else {
                state.unshift(courseId);
            }
        },
        
    }
});

export const { toggleSavedCourse } = savedCoursesSlice.actions;
export default savedCoursesSlice.reducer;