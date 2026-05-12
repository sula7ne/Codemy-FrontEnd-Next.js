import Link from "next/link";
import styles from "./AccordionLessonsList.module.scss";
import { useAppSelector } from "@/state/hooks";
import clsx from "clsx";
import { sections } from "@/data/sections";

interface AccordionLessonsListProps {
    sectionId: string
}

const AccordionLessonsList = ({ sectionId }: AccordionLessonsListProps) => {
    const section = sections.find(el => el.id === sectionId);

    const lessons = useAppSelector((state) => state.lessons).filter(lesson => section?.lessons.includes(lesson.id));

    return (
        <ul className={styles.list}>
            {lessons.map((lesson, id) => (
                <li key={lesson.id}>
                    <Link className={clsx(styles.item, lesson.isCompleted && styles.completed)} href={`/lessons/${lesson.id}`}>
                        <div className={styles.icon}>
                            {lesson.isCompleted ?
                                <svg viewBox="0 0 256 256" width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="40 144 96 200 224 72" stroke="#121212" strokeLinecap="round" strokeLinejoin="round" strokeWidth="50"/></svg>
                                :   
                                <svg viewBox="0 0 256 256" fill="#f1f1f1" width={10} height={10}><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
                            }
                        </div>
        
                        <h3 className={styles.title}>{lesson.title}</h3>
                    </Link> 
                    {(id+1) !== lessons.length && <div className={styles.line}></div>}
                </li>     
            ))}
        </ul>
    );
}

export default AccordionLessonsList;