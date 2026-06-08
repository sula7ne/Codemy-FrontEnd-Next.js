import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";
import { useEffect, useState } from "react";

import FileBar from "./FileBar/FileBar";
import { Lesson } from "@/types/lessons";
import MonacoEditor from "./MonacoEditor";
import WebWindow from "./WebWindow/WebWindow";
import clsx from "clsx";
import { findFile } from "@/utils/findFile";
import { isMac } from "@/utils/isMac";
import { refreshWebPage } from "@/state/slices/activeLessonSlice";
import { runAndValidate } from "@/state/thunk/runAndValidate";
import styles from './Editor.module.scss';
import { useUpdateFileCodeMutation } from "@/state/api/lessonsApi";

interface ICodeEditorProps {
    lesson: Lesson,
    isEditMode: boolean
}

const CodeEditor = ({ lesson, isEditMode }: ICodeEditorProps) => {
    const dispatch = useAppDispatch();
    
    const [updateFileCode] = useUpdateFileCodeMutation();

    const { activeTab, fileTree } = useAppSelector((state) => state.activeLesson); 

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if ((isMac() ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                
                dispatch(runAndValidate());
                // const file = findFile(fileTree, activeTab);

                // if (file && file.type === "FILE") {
                //     try {
                //         await updateFileCode({
                //             lessonId: lesson.id,
                //             body: {
                //                 path: file.path,
                //                 code: file.code || ""
                //             }
                //         }).unwrap();
                        
                //         console.log("Код успешно сохранен в базу!");
                //     } catch (error) {
                //         console.error("Не удалось сохранить код:", error);
                //     }
                // }
                
                // dispatch(refreshWebPage());
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch, activeTab, fileTree, lesson.id, updateFileCode]);

    return (
        <div className={styles.editor}>
            <FileBar lesson={lesson} />
            
            <MonacoEditor lesson={lesson} />
            
            <WebWindow lesson={lesson} isEditMode={isEditMode} />
        </div>
    );
}

export default CodeEditor;