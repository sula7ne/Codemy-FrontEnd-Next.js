"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import { Suspense } from "react";
import { course } from "@/types/course";
import styles from "./Courses.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useSearchParams } from "next/navigation";

const CoursesList = () => {
    const courses = useAppSelector((state) => state.courses);
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const filterSearch = (el: course) => {
        if(search) return el.title.toLowerCase().includes(search.toLowerCase());
        
        return true;
    }
    
    return (
        <div className={styles.courses}>
            <div className={styles.content}>
                {courses.filter(el => filterSearch(el)).map((el) => (
                    <CourseCard key={el.id} course={el} />
                ))}
            </div>
        </div>
    );
}

const Courses = () => {
    return (
        <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
            <CoursesList />
        </Suspense>
    );
}

export default Courses;