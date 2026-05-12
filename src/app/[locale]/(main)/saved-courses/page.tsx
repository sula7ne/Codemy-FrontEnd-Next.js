"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Link from "next/link";
import styles from "./SavedCourses.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useTranslations } from "next-intl";

const SavedCourses = () => {
    const t = useTranslations('Saved-Courses');
    const courses = useAppSelector((state) => state.courses);
    const savedCoursesIds = useAppSelector((state) => state.savedCourses);
    const savedCourses = courses.filter((el) => savedCoursesIds.includes(el.id));

    return (
        <div className={styles['saved-courses']}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                {savedCourses.length ?
                    savedCourses.map((el) => (
                        <CourseCard key={el.id} course={el} />
                    ))
                    :
                    <p className={styles.empty}>
                        {t.rich('empty', {
                            link: (chunks) => (
                                <Link href="/courses">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                }
            </div>
        </div>
    );
}

export default SavedCourses;