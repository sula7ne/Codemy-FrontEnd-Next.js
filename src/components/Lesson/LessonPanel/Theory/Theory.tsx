import { Dispatch, SetStateAction } from "react";

import { Lesson } from "@/types/lessons";
import MarkdownViewer from "@/components/Markdown/MarkdownViewer";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { lessonPanelId } from "@/types/lessonPanel";
import styles from './Theory.module.scss';
import { useTranslations } from "next-intl";

interface TheoryProps {
    setPanel: Dispatch<SetStateAction<lessonPanelId | null>>,
    lesson: Lesson,
    isEditMode: boolean
}

const Theory = ({ setPanel, lesson, isEditMode }: TheoryProps) => {
    const t = useTranslations('Lesson');

    const handleOnClick = () => {
        setPanel(null);
    }

    return (
        <div className={styles.theory}>
            <section className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{lesson.title}</h1>
                    Изменить
                </div>

                {/* <div className={styles.video}>
                    <VideoPlayer src="https://youtu.be/y4gWr2fya0I?si=qNRo0wsTWAL5MY-S" />
                </div> */}
 
                <MarkdownViewer markdown={lesson.theory} />
            </section>

            <div className={styles.controls}>
                <button onClick={handleOnClick}>{t('panel.theoryBtn')}</button>
            </div>
        </div>
    );
}

export default Theory;