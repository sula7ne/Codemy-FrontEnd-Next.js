import { Dispatch, SetStateAction, useState } from "react";

import { Lesson } from "@/types/lessons";
import MarkdownViewer from "@/components/Markdown/MarkdownViewer";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { lessonPanelId } from "@/types/lessonPanel";
import styles from './Theory.module.scss';
import { useTranslations } from "next-intl";
import { useUpdateLessonMutation } from "@/state/api/sectionsApi";

interface TheoryProps {
    setPanel: Dispatch<SetStateAction<lessonPanelId | null>>,
    lesson: Lesson,
    isEditMode: boolean
}

const Theory = ({ setPanel, lesson, isEditMode }: TheoryProps) => {
    const t = useTranslations('Lesson');
    const [theory, setTheory] = useState(lesson.theory);
    const [isEditTheory, setIsEditTheory] = useState(false);

    const [updateLesson] = useUpdateLessonMutation();

    const handleOnClick = () => {
        setPanel(null);
    }
    
    const clickEdit = async () => {
        if(isEditMode) {
            if(isEditTheory) {
                try {
                    const { sectionId, id, title } = lesson;

                    await updateLesson({ sectionId, lessonId: id, data: { title, theory } }).unwrap()

                    setIsEditTheory((prev) => !prev);

                    return;
                } catch(e) {
                    console.error("Theory error:", e);
                }
            }

            setIsEditTheory((prev) => !prev);
        }
    }

    return (
        <div className={styles.theory}>
            <section className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{lesson.title}</h1>
                </div>

                {/* <div className={styles.video}>
                    <VideoPlayer src="https://youtu.be/y4gWr2fya0I?si=qNRo0wsTWAL5MY-S" />
                </div> */}
 
                {isEditTheory ?
                    <textarea id="theory" value={theory} onChange={(e) => setTheory(e.target.value)} />
                    :
                    <MarkdownViewer markdown={lesson.theory} />
                }
            </section>

            <div className={styles.controls}>
                <button className={styles.enter} onClick={handleOnClick}>{t('panel.theoryBtn')}</button>
                
                {isEditMode && <button className={styles.edit} onClick={clickEdit}>{isEditTheory ? 'Сохранить' : 'Изменить'}</button>}
            </div>
        </div>
    );
}

export default Theory;