"use client"

import Accordion from "@/components/Accordion/CreateCourseAccordion/Accordion";
import CreateCourseHeader from "@/components/Course/CourseHeader/CreateCourseHeader";
import NotFound from "@/components/NotFound/NotFound";
import styles from "./Create.module.scss";
import { useGetCourseByIdQuery } from "@/state/api/coursesApi";
import { useParams } from "next/navigation";

const CreateCourse = () => {
    const params = useParams();
    const id = params.id as string;
    
    const { data: course } = useGetCourseByIdQuery(id);
    if(!course) return <NotFound />

    return (
        <div className={styles.course}>
            <CreateCourseHeader course={course} />

            <Accordion sections={course.sections} courseId={course.id} />
        </div>
    );
}

export default CreateCourse;