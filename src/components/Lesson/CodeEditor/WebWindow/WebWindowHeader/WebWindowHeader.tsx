import { ChangeEvent, KeyboardEvent } from "react";
import { refreshWebPage, runCode, setFilePath } from "@/state/slices/activeLessonSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import styles from "./WebWindowHeader.module.scss";

const WebWindowHeader = () => {
    const filePath = useAppSelector(state => state.activeLesson.filePath);
    const dispatch = useAppDispatch();
    
    const handleClickRun = () => {
        dispatch(runCode());
    }
    const handleClickRefresh = () => {
        dispatch(refreshWebPage());
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") dispatch(refreshWebPage());
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        dispatch(setFilePath(e.target.value));
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles['run-code']} onClick={handleClickRun}>
                    <svg className={styles.icon} viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
                    <span className={styles.title}>run</span>
                </button>
                {/* <button className={styles.back}></button>
                <button className={styles.forward}></button> */}
                <button className={styles.refresh} onClick={handleClickRefresh}>refresh</button>
            </div>
            <div className={styles.center}>
                <input 
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown}
                    value={filePath ?? ""} 
                    type="text" 
                    spellCheck="false" 
                />
            </div>
            {/* <div className={styles.right}>
                <button className={styles['run-code']} onClick={() => dispatch(compileCode())}>RUN</button>
                <button className={styles.['full-screen']}></button> 
            </div> */}
        </header>
    );
}

export default WebWindowHeader;