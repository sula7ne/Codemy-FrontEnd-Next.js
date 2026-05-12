"use client"

import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";

import CodeEditor from "@/components/Lesson/CodeEditor/CodeEditor";
import LessonPanel from "@/components/Lesson/LessonPanel/LessonPanel";
import NotFound from "@/components/NotFound/NotFound";
import { setActiveLesson } from "@/state/slices/activeLessonSlice";
import styles from "./Lesson.module.scss";
import { useParams } from "next/navigation";
import { lessonPanelId } from "@/types/lessonPanel";

const Lesson = () => {
    const params = useParams();
    const id = params.id;
    const lessons = useAppSelector((state) => state.lessons);
    const activeLesson = lessons.find(el => el.id === id);
    const dispatch = useAppDispatch();
    
    const [panel, setPanel] = useState<lessonPanelId | null>("theory");

    const closePanel = () => setPanel(null);
    
    useEffect(() => {
        if(activeLesson) {
            dispatch(setIsOverlay(true));
            dispatch(setIsActive(false));
            dispatch(setIsExpanded(false));
            
            dispatch(setActiveLesson(activeLesson));
            
            return () => {
                dispatch(setIsOverlay(false));
                dispatch(setIsActive(true)); 
                dispatch(setIsFixed(false));
            }
        }
    }, [dispatch, activeLesson]);

    if(!activeLesson) return <NotFound />;

    return (
        <div className={styles.lesson}>
            <LessonPanel panel={panel} setPanel={setPanel} />

            <CodeEditor /> 

            {panel && <div className={styles.overlay} onClick={closePanel}></div>}
        </div>
    );
}

export default Lesson;