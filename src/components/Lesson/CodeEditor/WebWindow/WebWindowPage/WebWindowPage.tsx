import { useEffect, useRef } from "react";

import styles from "./WebWindowPage.module.scss";
import { useAppSelector } from "@/state/hooks";

const WebWindowPage = () => {
    const compiledCode = useAppSelector(state => state.activeLesson.compiledCode);

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = compiledCode;
        }
    }, [compiledCode]);

    return (
        <main className={styles.page}>
            <iframe ref={iframeRef} sandbox="allow-scripts">
                
            </iframe>
        </main>
    );
}

export default WebWindowPage;