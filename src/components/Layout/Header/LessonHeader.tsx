import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import Accordion from "@/components/Accordion/AccordionLesson/Accordion";
import HeaderActions from "./HeaderActions/HeaderActions";
import Link from "next/link";
import MenuBtn from "@/components/Menu/MenuBtn";
import NotFound from "@/app/[locale]/not-found";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { useGetLessonByIdQueryWithDetailsQuery } from "@/state/api/lessonsApi";
import { useParams } from "next/navigation";
import { useState } from "react";

const LessonHeader = () => {
    const params = useParams();
    const id = params.id as string;

    const { isOverlay } = useAppSelector((state) => state.sidebar);

    const [isDropDown, setIsDropDown] = useState(false);
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        if(isOverlay) {
            dispatch(setIsActive(true));
            dispatch(setIsOverlay(false));
            dispatch(setIsFixed(false));
            dispatch(setIsExpanded(false));
        }
    }

    const { data: lesson, isError: isLessonError } = useGetLessonByIdQueryWithDetailsQuery(id);
    if(isLessonError || !lesson) return <NotFound />

    const allTasksCompleted = lesson?.tasks?.length > 0 && lesson.tasks.every(task => task.isCompleted);

    return (
        <header className={styles.header}>
            {/* <div className={clsx(styles.left, isExpanded && styles.expanded)}></div> */}
            <div className={styles.left}>
                <MenuBtn />
                
                <h1 className={styles.title}>
                    <Link className={styles.link} onClick={handleOnClick} href="/">
                        CODEMY
                        {/* <span className={styles.country}>KZ</span> */}
                    </Link>
                </h1>

                <div className={styles.accordion} onMouseEnter={() => setIsDropDown(true)} onMouseLeave={() => setIsDropDown(false)}>
                    <Link className={styles.open} href={`/courses/${lesson.section.courseId}`}>
                        <span>{lesson.section.title}</span>
                        <span className={clsx(allTasksCompleted && styles.complete)}>{lesson.title}</span>
                    </Link>

                    {isDropDown && <div className={styles.dropdown}>
                        <Accordion sections={lesson.section.course.sections} />
                    </div>}
                </div>
            </div>

            <div className={styles.right}>
                <HeaderActions />
            </div>
        </header>
    );
}

export default LessonHeader;