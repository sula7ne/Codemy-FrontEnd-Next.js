import FileBar from "./FileBar/FileBar";
import MonacoEditor from "./MonacoEditor";
import WebWindow from "./WebWindow/WebWindow";
import { isMac } from "@/utils/isMac";
import { refreshWebPage } from "@/state/slices/activeLessonSlice";
import styles from './Editor.module.scss';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CodeEditor = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((isMac() ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                dispatch(refreshWebPage());
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch]);

    return (
        <div className={styles.editor}>
            <FileBar />
            
            <MonacoEditor />
            
            <WebWindow />
        </div>
    );
}

export default CodeEditor;