import styles from "./AccordionLessonsList.module.scss";
import { useState } from "react";
import ChangeLessonPopUp from "@/components/PopUp/Lesson/ChangeLessonPopUp";
import { lesson } from "@/types/lesson";
import Link from "next/link";

interface AccordionLessonProps {
    lesson: lesson
}

const AccordionLesson = ({ lesson }: AccordionLessonProps) => {
    const [isPopUp, setIsPopUp] = useState(false);

    const handleOnClick = () => {
        setIsPopUp(true);
    }

    return (
        <>
            <li key={lesson.id}>
                <div className={styles.item}>
                    <div className={styles.icon}>
                        <svg viewBox="0 0 256 256" fill="white" width={10} height={10}><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
                    </div>

                    <div className={styles['title-container']}>
                        <h3 className={styles.title}>
                            <Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link>
                        </h3>
                        <div className={styles['change-icon']} onClick={handleOnClick}>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M15.293 3.293 4.96 13.626c-.22.219-.385.488-.484.782l-1.924 5.778-.633 1.897 1.897-.633 5.777-1.927a2 2 0 00.78-.482l9.334-9.334 1-1a3.83 3.83 0 00-5.414-5.414Zm4 1.414a1.83 1.83 0 010 2.586L19 7.586 16.414 5l.293-.293a1.83 1.83 0 012.586 0ZM6.374 15.04 15 6.414 17.586 9 8.96 17.626 5.08 18.92l1.294-3.88Z"></path></svg>
                        </div>
                    </div>
                </div> 
                
                <div className={styles.line}></div>
            </li>

            {isPopUp && <ChangeLessonPopUp setIsPopUp={setIsPopUp} lesson={lesson} />}
        </>
    );
}

export default AccordionLesson;