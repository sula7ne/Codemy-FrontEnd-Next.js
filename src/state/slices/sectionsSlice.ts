import { createSlice } from "@reduxjs/toolkit";
import { sections } from "@/data/sections";

const initialState = sections;

const sectionsSlice = createSlice({
    name: "sections",
    initialState,
    reducers: {
        
    }
});

// export const {} = sectionsSlice.actions;
export default sectionsSlice.reducer;