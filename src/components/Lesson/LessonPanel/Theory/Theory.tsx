import { Dispatch, SetStateAction } from "react";

import MarkdownViewer from "@/components/Markdown/MarkdownViewer";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { lessonPanelId } from "@/types/lessonPanel";
import styles from './Theory.module.scss';
import { useAppSelector } from "@/state/hooks/hooks";
import { useTranslations } from "next-intl";

interface TheoryProps {
    setPanel: Dispatch<SetStateAction<lessonPanelId | null>>
}

const Theory = ({setPanel}: TheoryProps) => {
    const t = useTranslations('Lesson');
    const { title, theory } = useAppSelector(state => state.activeLesson);

    const handleOnClick = () => {
        setPanel(null);
    }

    return (
        <div className={styles.theory}>
            <section className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                </div>

                <div className={styles.video}>
                    <VideoPlayer src="https://youtu.be/y4gWr2fya0I?si=qNRo0wsTWAL5MY-S" />
                </div>
                
                <MarkdownViewer markdown={theory} />
            </section>

            <div className={styles.controls}>
                <button onClick={handleOnClick}>{t('panel.theoryBtn')}</button>
            </div>
        </div>
    );
}

export default Theory;