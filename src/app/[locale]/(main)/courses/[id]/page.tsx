"use client"

import Accordion from "@/components/Accordion/AccordionCourse/Accordion";
import CourseHeader from "@/components/Course/CourseHeader/CourseHeader";
import NotFound from "@/components/NotFound/NotFound";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { authors } from "@/data/authors";
import styles from "./Course.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useParams } from "next/navigation";

const Course = () => {
    const courses = useAppSelector((state) => state.courses);
    
    const params = useParams();
    const id = params.id as string;
    if(!id) return <NotFound />;
    

    const activeCourse = courses.find(el => el.id === id);
    if(!activeCourse) return <NotFound />;

    const author = authors.find(el => el.id === activeCourse.authorId);
    if(!author) return <NotFound />;
    
    // I need to unite activeLessonSlice and userCoursesSlice, so i have to delete activeLessonSlice

    return (
        <div className={styles.course}>
            <CourseHeader />

            <ProgressBar percent={25} />

            <Accordion sections={activeCourse.sections} />
        </div>
    );
}

export default Course;