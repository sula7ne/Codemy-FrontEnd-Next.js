import AccordionLessonsList from "@/components/Accordion/AccordionLesson/AccordionLessonsList/AccordionLessonsList";
import clsx from "clsx";
import { sections } from "@/data/sections";
import styles from "./AccordionItem.module.scss";
import { useState } from "react";
import { useAppSelector } from "@/state/hooks";

interface AccordionItemProps {
    sectionId: string,
    isFirstChild: boolean,
    isLastChild: boolean
}

const AccordionItem = ({ sectionId, isFirstChild, isLastChild }: AccordionItemProps) => {
    const [isActive, setIsActive] = useState(isFirstChild);

    const section = sections.find(el => el.id === sectionId);
    const lessons = useAppSelector((state) => state.lessons);
    if(!section) return null;

    const completedLessons = lessons.filter(lesson => section.lessons.includes(lesson.id) && lesson.isCompleted);
    const isSectionCompleted = completedLessons.length === section.lessons.length;

    const handleOnClick = () => {
        setIsActive(prev => !prev);
    }

    return (
        <li className={clsx(styles.item, isSectionCompleted && styles.completed)}>
            <button onClick={handleOnClick} className={styles.open}>
                <div className={clsx(styles.icon, isActive && styles.active)}>
                    <svg viewBox="0 0 256 256" width={10} height={10}><polyline points="96 48 176 128 96 208" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="50"></polyline></svg>
                </div>

                <h3 className={styles.title}>{section.title}</h3>

                <div className={styles.lessons}>{completedLessons.length} / {section.lessons.length}</div>
            </button>

            <div className={clsx(styles.panel, isActive && styles.active)}>
                <div className={styles.list}>
                    <div className={styles.lines}>
                        <div className={styles['line-a']}></div>
                        <div className={styles['line-b']}></div>
                    </div>

                    <AccordionLessonsList sectionId={sectionId} />

                    {!isLastChild && <div className={styles.lines}>
                        <div className={styles['line-c']}></div>
                        <div className={styles['line-d']}></div>
                    </div>}
                </div>
            </div>

            {!isActive && !isLastChild && <div className={styles.line}></div>}
        </li>
    );
}

export default AccordionItem;