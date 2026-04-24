import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { item, newItem } from "@/types/fileTree";
import { lesson, selectedItem, tab } from "@/types/lesson";

import { findFile } from "@/utils/findFile";
import { isRunnableFile } from "@/utils/isRunnableFile";

// import { lesson } from "../../data/lesson";

// const initialState = lesson;

const initialState: lesson = {
    id: "",
    sectionId: null,
    title: "",
    order: null,
    theory: "",
    tasks: [],
    fileTree: [],
    tabs: [],
    activeTab: '', // null
    selectedItem: {
        type: "folder",
        path: "."
    },
    compiledCode: "",
    filePath: 'null', // null
};

const activeLessonSlice = createSlice({
    name: 'activeLesson',
    initialState,
    reducers: {
        setActiveLesson: (_, action: PayloadAction<lesson>) => {
            return { ...initialState, ...action.payload };
        },
        setActiveTab: (state, action: PayloadAction<string>) => {
            const path = action.payload;
            
            state.activeTab = path;

            state.selectedItem = { type: 'file', path };
        },
        openTab: (state, action: PayloadAction<tab>) => {
            const path = action.payload.path;

            if(!state.tabs.some(el => el.path === path)) state.tabs.push(action.payload);

            state.activeTab = path;

            state.selectedItem = { type: 'file', path };
        },
        closeTab: (state, action: PayloadAction<string>) => {
            const path = action.payload;

            const index = state.tabs.findIndex(el => el.path === path);
            if (index === -1) return;

            const filtered = state.tabs.filter(el => el.path !== path);

            if (state.activeTab === path) {
                const nextTab = filtered[index] || filtered[index - 1] || null;
                state.activeTab = nextTab ? nextTab.path : ''; // null
            }

            state.tabs = filtered;
        },

        setSelectedItem: (state, action: PayloadAction<selectedItem>) => {
            state.selectedItem = action.payload;
        },

        updateCode: (state, action: PayloadAction<string>) => {
            const { fileTree, activeTab } = state;
            
            const file = findFile(fileTree, activeTab);
            if(file?.type === 'file') file.code = action.payload;
        },
        refreshWebPage: (state) => {            
            const { fileTree, filePath } = state;
            const file = findFile(fileTree, filePath);
            let code = "";

            if(file?.type === 'file' && isRunnableFile(filePath)) code = file.code;
            
            state.compiledCode = code;
        },
        runCode: (state) => {
            const { fileTree, activeTab } = state;

            if(isRunnableFile(activeTab)) {
                const file = findFile(fileTree, activeTab);
                
                if(file?.type === 'file') {
                    state.filePath = activeTab;
                    state.compiledCode = file.code;
                }
            }
            
            // let path = isRunnableFile(activeTab) ? activeTab : filePath;
            // let code = "";

            // const file = findFile(fileTree, path);
            
            // if(file && isRunnableFile(path)) code = file.code;
            
            // state.compiledCode = code;
            // state.filePath = path;
        },

        setFilePath: (state, action: PayloadAction<string>) => {
            state.filePath = action.payload;
        },
        
        createItem: (state, action: PayloadAction<newItem>) => {
            const { title, parentPath, path, type } = action.payload;
            let newItem: item;

            if(type === 'file') {
                const extension = title.includes(".") ? title.split(".").pop() || "unknown" : "unknown";
                
                newItem = { type, title, path, extension, code: "" };
            } else if(type === 'folder') {
                newItem = { type, title, path, children: [] };
            } else {
                return console.log('Invalid type!');
            }

            if(parentPath === ".") {
                state.fileTree.push(newItem);  
            } else {
                const parent = findFile(state.fileTree, parentPath);
                
                if(parent?.type === 'folder') parent.children.push(newItem);   
            }
        },
    }
});

export const { setActiveLesson, setActiveTab, openTab, closeTab, updateCode, setSelectedItem, refreshWebPage, runCode, setFilePath, createItem } = activeLessonSlice.actions;
export default activeLessonSlice.reducer;