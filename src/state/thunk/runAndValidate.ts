import { runCode, setTestResult } from "../slices/activeLessonSlice";

import { RootState } from "../store";
import { Task } from "@/types/lessons";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { findFile } from "@/utils/findFile";
import { lessonsApi } from "../api/lessonsApi";
import { runTest } from "@/utils/runTest";

export const runAndValidate = createAsyncThunk(
    'activeLesson/runAndValidate',
    async (_, { dispatch, getState }) => {
        const state = (getState() as RootState).activeLesson;
        const { activeTab, fileTree, id: lessonId } = state;

        const file = findFile(fileTree, activeTab);
        if (file?.type === "FILE") {
            await dispatch(lessonsApi.endpoints.updateFileCode.initiate({
                lessonId,
                body: { path: file.path, code: file.code || "" }
            })).unwrap();
        }
        
        dispatch(runCode());

        await new Promise(resolve => setTimeout(resolve, 500));

        const iframe = document.querySelector('iframe');
        if (!iframe) return;

        for (const task of state.tasks) {
            if(task.isCompleted) continue; // for optimization
            
            const result = runTest(iframe, task);
            console.log(`Task ${task.id} result:`, result);
            
            dispatch(setTestResult({ taskId: task.id, result }));

            if (result.success) {
                await dispatch(lessonsApi.endpoints.completeTaskStatus.initiate({ 
                    taskId: task.id 
                })).unwrap();
            }
        }
    }
);