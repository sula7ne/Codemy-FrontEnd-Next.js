"use client"

import { useAppSelector } from "@/state/hooks";
import styles from "./Create.module.scss";
import { useState } from "react";
import CreateCoursePopUp from "@/components/PopUp/Course/CreateCoursePopUp";
import CreateCourseCard from "@/components/Course/CourseCard/CreateCourseCard";
import { useTranslations } from "next-intl";

const CreateCourse = () => {
    const t = useTranslations('Create-Courses');
    const myCourses = useAppSelector((state) => state.courses).filter(el => el.authorId === '3');
    const [isCreatePopUp, setIsCreatePopUp] = useState(false);

    return (
        <div className={styles['create-course']}>
            <div className={styles.top}>
                <h2 className={styles.title}>{t('title')}</h2>

                <button className={styles.create} onClick={() => setIsCreatePopUp(true)} tabIndex={0}>
                    <div className={styles.icon}>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="m17.232 2.354-9.546 9.547a3 3 0 00-.789 1.394l-.866 3.462-.404 1.617 1.616-.404 3.463-.865a3 3 0 001.394-.79l9.546-9.547a2.5 2.5 0 000-3.536l-.878-.878a2.5 2.5 0 00-3.536 0ZM14.758 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V9.242l-2 2V20H4V4h8.758l2-2Zm4.597 1.768.877.878a.5.5 0 010 .708l-.732.732L17.915 4.5l.733-.732a.5.5 0 01.707 0ZM9.1 13.315l7.4-7.4L18.086 7.5l-7.4 7.401c-.129.128-.29.22-.465.264l-1.846.46.462-1.846a1 1 0 01.263-.464Z"></path></svg>
                    </div>
                    <span>{t('button')}</span>
                </button>
            </div>

            <div className={styles.content}>
                {myCourses.length ?
                    myCourses.map((el) => (
                        <CreateCourseCard key={el.id} course={el} />
                    ))
                    :
                    <p className={styles.empty}>{t('empty')}</p>
                }
            </div>

            {isCreatePopUp && <CreateCoursePopUp setIsPopUp={setIsCreatePopUp} />}
        </div>
    );
}

export default CreateCourse;