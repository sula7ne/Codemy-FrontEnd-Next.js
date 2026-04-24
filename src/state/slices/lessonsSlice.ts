import { createSlice } from "@reduxjs/toolkit"
import { lessons } from "@/data/lessons";

const initialState = lessons;

const lessonsSlice = createSlice({
    name: "lessons",
    initialState,
    reducers: {
        
    }
});

// export const {} = lessonsSlice.actions;
export default lessonsSlice.reducer;