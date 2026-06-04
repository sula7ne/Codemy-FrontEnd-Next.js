"use client"

import { Course } from "@/types/courses";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import { Suspense } from "react";
import styles from "./Courses.module.scss";
import { useGetCoursesQuery } from "@/state/api/coursesApi";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const CoursesList = () => {
    const t = useTranslations('Courses');
    const { data: courses, isLoading } = useGetCoursesQuery();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const filterSearch = (el: Course) => {
        if(search) return el.title.toLowerCase().includes(search.toLowerCase());
        
        return true;
    }

    if(isLoading) return <div className={styles.loader}>Loading...</div>;
    
    return (
        <div className={styles.courses}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                {courses?.filter(el => filterSearch(el)).map((el) => (
                    <CourseCard key={el.id} course={el} />
                ))}
            </div>
        </div>
    );
}

const Courses = () => {
    return (
        <Suspense fallback={<div className={styles.loader}>Loading Search...</div>}>
            <CoursesList />
        </Suspense>
    );
}

export default Courses;