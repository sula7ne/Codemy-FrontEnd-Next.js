import AccordionLesson from "./AccordionLesson";
import CreateLessonPopUp from "@/components/PopUp/Lesson/CreateLessonPopUp";
import clsx from "clsx";
import { sections } from "@/data/sections";
import styles from "./AccordionLessonsList.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface AccordionLessonsListProps {
    sectionId: string
}

const AccordionLessonsList = ({ sectionId }: AccordionLessonsListProps) => {
    const t = useTranslations('Accordion');
    const [isCreatePopUp, setIsCreatePopUp] = useState(false);

    const section = sections.find(el => el.id === sectionId);

    const lessons = useAppSelector((state) => state.lessons).filter(lesson => section?.lessons.includes(lesson.id));

    const handleOnClick = () => {
        setIsCreatePopUp(true);
    }

    return (
        <>
            <ul className={styles.list}>
                {lessons.map((lesson) => (
                    <AccordionLesson key={lesson.id} lesson={lesson} />   
                ))}

                <li className={clsx(styles.item, styles.create)} onClick={handleOnClick}>
                    <div className={styles.icon}>  
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path></svg>
                    </div>

                    <h3 className={styles.title}>{t('AddLesson')}</h3>
                </li>     
            </ul>

            {isCreatePopUp && <CreateLessonPopUp setIsPopUp={setIsCreatePopUp} />}
        </>
    );
}

export default AccordionLessonsList;