import { FileTreeNode, Lesson, Task } from "@/types/lessons";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { buildFileTree } from "@/utils/buildFileTree";
import { bundleHtmlWithCss } from "@/utils/bundleHtmlWithCss";
import { findFile } from "@/utils/findFile";
import { isRunnableFile } from "@/utils/isRunnableFile";

export interface Tab {
    title: string;
    path: string;
    extension: string | null;
}

export interface SelectedItem {
    type: 'FILE' | 'FOLDER';
    path: string;
}

export interface NewItem {
    title: string;
    parentPath: string;
    path: string;
    type: 'FILE' | 'FOLDER';
}

interface ActiveLessonState {
    id: string;
    title: string;
    theory: string;
    tasks: Task[];
    testResults: Record<string, { success: boolean; message: string }>;
    fileTree: FileTreeNode[];
    tabs: Tab[];
    activeTab: string;
    selectedItem: SelectedItem;
    compiledCode: string;
    filePath: string;
}

const initialState: ActiveLessonState = {
    id: "",
    title: "",
    theory: "",
    tasks: [],
    testResults: {},
    fileTree: [],
    tabs: [],
    activeTab: "",
    selectedItem: {
        type: "FOLDER",
        path: "."
    },
    compiledCode: "",
    filePath: "",
};

const activeLessonSlice = createSlice({
    name: 'activeLesson',
    initialState,
    reducers: {
        setActiveLesson: (state, action: PayloadAction<Lesson>) => {
            const lesson = action.payload;
            state.id = lesson.id;
            state.title = lesson.title;
            state.theory = lesson.theory || "";
            state.tasks = lesson.tasks || [];
            
            state.fileTree = buildFileTree(lesson.files || []);

            const defaultTabs = (lesson.files || [])
                .filter(f => f.isTab && f.type === 'FILE')
                .map(f => ({
                    title: f.title,
                    path: f.path,
                    extension: f.extension
                }));

            state.tabs = defaultTabs;

            if (defaultTabs.length > 0) {
                state.activeTab = defaultTabs[0].path;
                state.selectedItem = { type: 'FILE', path: defaultTabs[0].path };
            }

            const runnableFile = lesson.files?.find(f => isRunnableFile(f.path));
            if (runnableFile) {
                state.filePath = runnableFile.path;
                
                const rawCode = runnableFile.code || "";

                if (runnableFile.path.endsWith('.html')) {
                    state.compiledCode = bundleHtmlWithCss(rawCode, state.fileTree, runnableFile.path);
                } else {
                    state.compiledCode = rawCode;
                }
            }
        },

        setActiveTab: (state, action: PayloadAction<string>) => {
            const path = action.payload;
            state.activeTab = path;
            state.selectedItem = { type: 'FILE', path };
        },

        openTab: (state, action: PayloadAction<Tab>) => {
            const path = action.payload.path;
            if (!state.tabs.some(el => el.path === path)) {
                state.tabs.push(action.payload);
            }
            state.activeTab = path;
            state.selectedItem = { type: 'FILE', path };
        },

        closeTab: (state, action: PayloadAction<string>) => {
            const path = action.payload;
            const index = state.tabs.findIndex(el => el.path === path);
            if (index === -1) return;

            const filtered = state.tabs.filter(el => el.path !== path);

            if (state.activeTab === path) {
                const nextTab = filtered[index] || filtered[index - 1] || null;
                state.activeTab = nextTab ? nextTab.path : '';
            }
            state.tabs = filtered;
        },

        setSelectedItem: (state, action: PayloadAction<SelectedItem>) => {
            state.selectedItem = action.payload;
        },

        updateCode: (state, action: PayloadAction<string>) => {
            const { fileTree, activeTab } = state;
            const file = findFile(fileTree, activeTab);
            
            if (file?.type === 'FILE') {
                file.code = action.payload;
            }
        },

        refreshWebPage: (state) => {            
            const { fileTree, filePath } = state;
            const file = findFile(fileTree, filePath);
            console.log(file)
            
            if (file?.type === 'FILE' && isRunnableFile(filePath)) {
                const rawCode = file.code || "";
                
                if (filePath.endsWith('.html')) {
                    state.compiledCode = bundleHtmlWithCss(rawCode, fileTree, filePath);
                } else {
                    state.compiledCode = rawCode;
                }
            }
        },

        runCode: (state) => {
            const { fileTree, activeTab } = state;
            if (isRunnableFile(activeTab)) {
                const file = findFile(fileTree, activeTab);
                
                if (file?.type === 'FILE') {
                    state.filePath = activeTab;
                    const rawCode = file.code || "";
                    
                    if (activeTab.endsWith('.html')) {
                        state.compiledCode = bundleHtmlWithCss(rawCode, fileTree, activeTab);
                    } else {
                        state.compiledCode = rawCode;
                    }
                }
            }
        },

        setFilePath: (state, action: PayloadAction<string>) => {
            state.filePath = action.payload;
        },
        
        createItem: (state, action: PayloadAction<NewItem>) => {
            const { title, parentPath, path, type } = action.payload;
            let newItemNode: FileTreeNode;

            if (type === 'FILE') {
                const extension = title.includes(".") ? title.split(".").pop()?.toLowerCase() || "" : "";
                newItemNode = { type, title, path, extension, code: "" };
            } else {
                newItemNode = { type, title, path, children: [] };
            }

            if (parentPath === ".") {
                state.fileTree.push(newItemNode);  
            } else {
                const parent = findFile(state.fileTree, parentPath);
                if (parent?.type === 'FOLDER' && parent.children) {
                    parent.children.push(newItemNode);   
                }
            }
        },
        setTestResult: (state, action: PayloadAction<{ taskId: string, result: { success: boolean, message: string } }>) => {
            state.testResults[action.payload.taskId] = action.payload.result;
        }
    }
});

export const { setActiveLesson, setActiveTab, openTab, closeTab, updateCode, setSelectedItem, refreshWebPage, runCode, setFilePath, createItem, setTestResult } = activeLessonSlice.actions;
export default activeLessonSlice.reducer;
