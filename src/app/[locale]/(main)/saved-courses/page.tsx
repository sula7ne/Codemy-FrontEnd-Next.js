"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Link from "next/link";
import styles from "./SavedCourses.module.scss";
import { useGetSavedCoursesQuery } from "@/state/api/coursesApi";
import { useTranslations } from "next-intl";

const SavedCourses = () => {
    const t = useTranslations('Saved-Courses');
    const { data: courses } = useGetSavedCoursesQuery();

    return (
        <div className={styles['saved-courses']}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                {courses?.map((el) => (
                    <CourseCard key={el.id} course={el} />
                ))}

                {courses?.length ?
                    courses?.map((el) => (
                        <CourseCard key={el.id} course={el} />
                    ))
                    :
                    <p className={styles.empty}>
                        {t.rich('empty', {
                            link: (chunks) => <Link href="/courses">{chunks}</Link>
                        })}
                    </p>
                }
            </div>
        </div>
    );
}

export default SavedCourses;