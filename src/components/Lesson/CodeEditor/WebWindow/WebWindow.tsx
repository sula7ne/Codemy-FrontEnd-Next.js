import { Lesson, Task } from "@/types/lessons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import Resizer from "@/components/Resizer/Resizer";
import Tasks from "@/components/Lesson/CodeEditor/WebWindow/Tasks/Tasks";
import WebWindowHeader from "./WebWindowHeader/WebWindowHeader";
import WebWindowPage from "@/components/Lesson/CodeEditor/WebWindow/WebWindowPage/WebWindowPage";
import { refreshWebPage } from "@/state/slices/activeLessonSlice";
import styles from "./WebWindow.module.scss";
import { useAppDispatch } from "@/state/hooks/hooks";

interface IWebWindowProps {
    lesson: Lesson,
    isEditMode: boolean
}

const MONACO_MIN_WIDTH = 250;

const WebWindow = ({ lesson, isEditMode }: IWebWindowProps) => {
    const dispatch = useAppDispatch();

    const webWindowRef = useRef<HTMLDivElement | null>(null);
    const [webWindowWidth, setWebWindowWidth] = useState(600);

    const MIN_WIDTH = useMemo(() => Math.max(250, window.innerWidth * 0.2), []);
    const MAX_WIDTH = useMemo(() => Math.min(1200, window.innerWidth * 0.7), []);

    const getMaxWidth = useCallback(() => {
        const editor = webWindowRef.current?.parentElement;
        if (!editor) return MAX_WIDTH;

        const fileBar = editor.children[0] as HTMLElement | undefined;
        const fileBarWidth = fileBar?.offsetWidth ?? 180;

        return Math.max(MIN_WIDTH, editor.clientWidth - fileBarWidth - MONACO_MIN_WIDTH);
    }, [MIN_WIDTH, MAX_WIDTH]);

   useEffect(() => {
        if (webWindowRef.current) {
            const parentWidth = webWindowRef.current.parentElement?.offsetWidth || window.innerWidth;
            const initialWidth = Math.min(
                (parentWidth - 200) / 2,
                getMaxWidth()
            );
            setWebWindowWidth(Math.max(MIN_WIDTH, initialWidth));
        }

        dispatch(refreshWebPage());
    }, [dispatch, MIN_WIDTH, getMaxWidth]);
    
    return (
        <div className={styles['web-window']} ref={webWindowRef} style={{width: `${webWindowWidth}px`}}>
            <div className={styles.wrapper}>

                <Resizer
                    direction="left" 
                    MIN_WIDTH={MIN_WIDTH} 
                    MAX_WIDTH={MAX_WIDTH}
                    getMaxWidth={getMaxWidth}
                    sidebarRef={webWindowRef} 
                    setSidebarWidth={setWebWindowWidth}
                />

                <div className={styles.content}>
                    <WebWindowHeader />

                    <WebWindowPage />

                    <Tasks tasks={lesson.tasks} isEditMode={isEditMode} />
                </div>
            </div>
        </div>
    );
}

export default WebWindow;
