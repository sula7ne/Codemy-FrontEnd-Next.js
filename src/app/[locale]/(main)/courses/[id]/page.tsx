"use client"

import Accordion from "@/components/Accordion/AccordionCourse/Accordion";
import CourseHeader from "@/components/Course/CourseHeader/CourseHeader";
import NotFound from "@/components/NotFound/NotFound";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import styles from "./Course.module.scss";
import { useGetCourseByIdQuery } from "@/state/api/coursesApi";
import { useParams } from "next/navigation";

const Course = () => {
    const params = useParams();
    const id = params.id as string;
    // if(!id) return <NotFound />;

    const { data: course, isLoading, isError } = useGetCourseByIdQuery(id);
    // I need to unite activeLessonSlice and userCoursesSlice, so i have to delete activeLessonSlice

    if (isLoading) {
        return <div className={styles.loading}>Курс загружается...</div>;
    }
    if (isError || !course) {
        return <NotFound />;
    }

    return (
        <div className={styles.course}>
            <CourseHeader course={course} />

            <ProgressBar percent={course.progressPercent || 0} />

            <Accordion sections={course.sections} />
        </div>
    );
}

export default Course;