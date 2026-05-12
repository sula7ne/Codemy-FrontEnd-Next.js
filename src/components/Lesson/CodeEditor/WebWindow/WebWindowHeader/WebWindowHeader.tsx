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
                <button className={styles.refresh} onClick={handleClickRefresh}>
                    <div className={styles.icon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20C9.76667 20 7.875 19.225 6.325 17.675C4.775 16.125 4 14.2333 4 12C4 9.76667 4.775 7.875 6.325 6.325C7.875 4.775 9.76667 4 12 4C13.15 4 14.25 4.2375 15.3 4.7125C16.35 5.1875 17.25 5.86667 18 6.75V4H20V11H13V9H17.2C16.6667 8.06667 15.9375 7.33333 15.0125 6.8C14.0875 6.26667 13.0833 6 12 6C10.3333 6 8.91667 6.58333 7.75 7.75C6.58333 8.91667 6 10.3333 6 12C6 13.6667 6.58333 15.0833 7.75 16.25C8.91667 17.4167 10.3333 18 12 18C13.2833 18 14.4417 17.6333 15.475 16.9C16.5083 16.1667 17.2333 15.2 17.65 14H19.75C19.2833 15.7667 18.3333 17.2083 16.9 18.325C15.4667 19.4417 13.8333 20 12 20Z" fill="currentColor"/></svg>
                    </div>
                </button>
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