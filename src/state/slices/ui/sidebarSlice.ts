import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
    isActive: boolean;
    isExpanded: boolean;
    isFixed: boolean;
    isOverlay: boolean;
}

const initialState: IState = {
    isActive: true,
    isExpanded: false,
    isFixed: false,
    isOverlay: false
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setIsActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
        setIsExpanded: (state, action: PayloadAction<boolean>) => {
            state.isExpanded = action.payload;
        },
        setIsFixed: (state, action: PayloadAction<boolean>) => {
            state.isFixed = action.payload;
        },
        setIsOverlay: (state, action: PayloadAction<boolean>) => {
            state.isOverlay = action.payload;
        }
    }
});

export const { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } = sidebarSlice.actions;
export default sidebarSlice.reducer;