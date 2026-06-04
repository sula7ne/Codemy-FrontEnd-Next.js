"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Link from "next/link";
import styles from "./MyLearning.module.scss";
import { useGetCoursesWithDetailsQuery } from "@/state/api/coursesApi";
import { useTranslations } from "next-intl";

const MyLearning = () => {
    const t = useTranslations('My-Learning');
    const { data: courses } = useGetCoursesWithDetailsQuery();

    const inProgressCourses = courses?.filter(el => el.userCourse.status === 'IN_PROGRESS')|| [];
    const completedCourses = courses?.filter(el => el.userCourse.status === 'COMPLETED')|| [];

    const totalCompletedLessons = courses?.reduce((sum, course) => {
        return sum + (course.completedLessonsCount || 0);
    }, 0) || 0;

    return (
        <div className={styles['my-learning']}>
            <h2 className={styles.title}>{t('title')}</h2>
        
            <div className={styles.content}>
                <div className={styles.analytic}>
                    <div className={styles.progress}>
                        <div className={styles.text}>
                            <strong>{t('goals')}</strong>
                            <p>{t('goalsDescription')}</p>
                        </div>

                        <div className={styles.statistic}>
                            <div className={styles.container}>
                                <strong>{completedCourses.length}</strong>
                                <p>{t('statCourses')}</p>
                            </div>
                            <div className={styles.container}>
                                <strong>{totalCompletedLessons}</strong>
                                <p>{t('statLessons')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['courses-container']}>
                    <div className={styles.courses}>
                        <h2 className={styles.title}>{t('inProgress')}</h2>
            
                        <div className={styles['courses-content']}>
                            {inProgressCourses.length ?
                                inProgressCourses.map((el) => (
                                    <CourseCard key={el.id} course={el} isProgressBar={true} />
                                ))
                                :
                                <p className={styles.empty}>
                                    {t.rich('inProgressEmpty', {
                                        link: (chunks) => <Link href="/courses">{chunks}</Link>
                                    })}
                                </p>
                            }
                        </div>
                    </div>
                    <div className={styles.courses}>
                        <h2 className={styles.title}>{t('completed')}</h2>
            
                        <div className={styles['courses-content']}>
                            {completedCourses.length ?
                                completedCourses.filter(el => el.userCourse.status === 'COMPLETED').map((el) => (
                                    <CourseCard key={el.id} course={el} />
                                ))
                                :
                                <p className={styles.empty}>
                                    {t.rich('completedEmpty', {
                                        link: (chunks) => <Link href="/courses">{chunks}</Link>
                                    })}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLearning;