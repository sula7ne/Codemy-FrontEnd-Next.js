import Link from "next/link";
import styles from "./AccordionLessonsList.module.scss";
import { useAppSelector } from "@/state/hooks";

interface AccordionLessonsListProps {
    sectionId: string
}

const AccordionLessonsList = ({ sectionId }: AccordionLessonsListProps) => {
    const lessons = useAppSelector((state) => state.lessons).filter(el => el.sectionId === sectionId);

    return (
        <ul className={styles.list}>
            {lessons.map((lesson) => (
                <li key={lesson.id}>
                    <Link className={styles.item}  href={`/lessons/${lesson.id}`}>{lesson.title}</Link> 
                </li>     
            ))}
        </ul>
    );
}

export default AccordionLessonsList;