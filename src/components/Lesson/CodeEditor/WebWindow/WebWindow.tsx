import { useEffect, useRef, useState } from "react"

import Resizer from "@/components/Resizer/Resizer";
import Tasks from "@/components/Lesson/CodeEditor/WebWindow/Tasks/Tasks";
import WebWindowHeader from "./WebWindowHeader/WebWindowHeader";
import WebWindowPage from "@/components/Lesson/CodeEditor/WebWindow/WebWindowPage/WebWindowPage";
import { refreshWebPage } from "@/state/slices/activeLessonSlice";
import styles from "./WebWindow.module.scss";
import { useAppDispatch } from "@/state/hooks";

const WebWindow = () => {
    const dispatch = useAppDispatch();
    
    const MIN_WIDTH = Math.max(250, window.innerWidth * 0.2);
    const MAX_WIDTH = Math.min(1200, window.innerWidth * 0.7);
    const webWindowRef = useRef<HTMLDivElement | null>(null);
    const [webWindowWidth, setWebWindowWidth] = useState(600);

   useEffect(() => {
        if (webWindowRef.current) {
            const parentWidth = webWindowRef.current.parentElement?.offsetWidth || window.innerWidth;
            setWebWindowWidth((parentWidth - 200) / 2); // filebar width
        }

        dispatch(refreshWebPage());
    }, [dispatch]);
    
    return (
        <div className={styles['web-window']} ref={webWindowRef} style={{width: `${webWindowWidth}px`}}>
            <div className={styles.wrapper}>

                <Resizer
                    direction="left" 
                    MIN_WIDTH={MIN_WIDTH} 
                    MAX_WIDTH={MAX_WIDTH} 
                    sidebarRef={webWindowRef} 
                    setSidebarWidth={setWebWindowWidth}
                />

                <div className={styles.content}>
                    <WebWindowHeader />

                    <WebWindowPage />

                    <Tasks />
                </div>
            </div>
        </div>
    );
}

export default WebWindow;