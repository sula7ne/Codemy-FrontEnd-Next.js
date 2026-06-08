"use client"

import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";
import { useEffect, useState } from "react";

import CodeEditor from "@/components/Lesson/CodeEditor/CodeEditor";
import LessonPanel from "@/components/Lesson/LessonPanel/LessonPanel";
import NotFound from "@/components/NotFound/NotFound";
import { lessonPanelId } from "@/types/lessonPanel";
import { setActiveLesson } from "@/state/slices/activeLessonSlice";
import styles from "./Lesson.module.scss";
import { useGetLessonByIdQueryQuery } from "@/state/api/lessonsApi";
import { useParams } from "next/navigation";

interface ILessonProps {
    isEditMode: boolean
}

const Lesson = ({ isEditMode = false }: ILessonProps) => {
    const params = useParams();
    const id = params.id as string;
    
    const { data: lesson, isLoading, isError } = useGetLessonByIdQueryQuery(id);
    
    const [panel, setPanel] = useState<lessonPanelId | null>("theory");

    const closePanel = () => setPanel(null);
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setIsOverlay(true));
        dispatch(setIsActive(false));
        dispatch(setIsExpanded(false));
        
        return () => {
            dispatch(setIsOverlay(false));
            dispatch(setIsActive(true)); 
            dispatch(setIsFixed(false));
        }
    }, [dispatch]);

    useEffect(() => {
        if (lesson) {
            dispatch(setActiveLesson(lesson));
        }
    }, [lesson, dispatch]);

    if (isLoading) {
        return <div className={styles.loading}>Урок загружается...</div>;
    }
    if (isError || !lesson) {
        return <NotFound />;
    }

    console.log(lesson)
    return (
        <div className={styles.lesson}>
            <LessonPanel panel={panel} setPanel={setPanel} lesson={lesson} isEditMode={isEditMode} />

            <CodeEditor lesson={lesson} isEditMode={isEditMode} /> 

            {panel && <div className={styles.overlay} onClick={closePanel}></div>}
        </div>
    );
}

export default Lesson;