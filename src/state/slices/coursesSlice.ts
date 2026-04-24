import { courses } from "@/data/courses";
import { createSlice } from "@reduxjs/toolkit"

const initialState = courses;

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        
    }
});

// export const {} = coursesSlice.actions;
export default coursesSlice.reducer;