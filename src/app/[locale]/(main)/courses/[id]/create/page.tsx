"use client"

import NotFound from "@/components/NotFound/NotFound";
import { authors } from "@/data/authors";
import styles from "./Create.module.scss";
import { useAppSelector } from "@/state/hooks";
import { useParams } from "next/navigation";
import Accordion from "@/components/Accordion/CreateCourseAccordion/Accordion";
import CreateCourseHeader from "@/components/Course/CourseHeader/CreateCourseHeader";

const CreateCourse = () => {
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
            <CreateCourseHeader />

            <Accordion sections={activeCourse.sections} />
        </div>
    );
}

export default CreateCourse;