"use client"

import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Link from "next/link";
import { setActiveLesson } from "@/state/slices/activeLessonSlice";
import styles from "./Lessons.module.scss";

const Lessons = () => {
    const lessons = useAppSelector(state => state.lessons);
    // const dispatch = useAppDispatch();
    
    // const handleSelectLesson = (lessonId: string) => {
    //     const activeLesson = lessons.find(el => el.id === lessonId);
    //     if(activeLesson) dispatch(setActiveLesson(activeLesson));
    // };
    
    return (
        <div className={styles.lessons}>
            Lessons

            <ul>
                {lessons.map((el) => (
                    <li key={el.id}>
                        <Link 
                            href={`/lessons/${el.id}`} 
                            // onClick={() => handleSelectLesson(el.id)}
                        >{el.title}</Link>
                    </li>
                ))}

                <Link href={"lessons/5"}>not found</Link>
            </ul>
        </div>
    );
}

export default Lessons;