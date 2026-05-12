"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Link from "next/link";
import styles from "./MyLearning.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useTranslations } from "next-intl";

const MyLearning = () => {
    const t = useTranslations('My-Learning');
    const completedCourses = useAppSelector((state) => state.courses);

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
                                <strong>1</strong>
                                <p>{t('statCourses')}</p>
                            </div>
                            <div className={styles.container}>
                                <strong>16</strong>
                                <p>{t('statLessons')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['courses-container']}>
                    <div className={styles.courses}>
                        <h2 className={styles.title}>{t('inProgress')}</h2>
            
                        <div className={styles['courses-content']}>
                            {completedCourses.length ?
                                completedCourses.filter(el => Number(el.id) % 2 === 0).map((el) => (
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
                            {[].length ?
                                completedCourses.filter(el => Number(el.id) % 2 !== 0).map((el) => (
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