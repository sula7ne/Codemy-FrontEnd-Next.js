import { Dispatch, SetStateAction } from "react";

import MarkdownViewer from "@/components/Markdown/MarkdownViewer";
import styles from './Theory.module.scss';
import { useAppSelector } from "@/state/hooks";

interface TheoryProps {
    setIsPanelActive: Dispatch<SetStateAction<boolean>>
}

const Theory = ({setIsPanelActive}: TheoryProps) => {
    const { title, theory } = useAppSelector(state => state.activeLesson);

    const handleOnClick = () => {
        setIsPanelActive(false);
    }

    return (
        <div className={styles.theory}>
            <section className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                
                <MarkdownViewer markdown={theory} />
            </section>

            <div className={styles.controls}>
                <button onClick={handleOnClick}>Перейти к заданию</button>
            </div>
        </div>
    );
}

export default Theory;