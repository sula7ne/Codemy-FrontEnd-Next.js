import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import clsx from "clsx";
import saveActiveIcon from "@/assets/images/icons/saveActive.svg";
import saveIcon from "@/assets/images/icons/save.svg";
import styles from "./CourseBtns.module.scss";
import { toggleSavedCourse } from "@/state/slices/savedCoursesSlice";

interface SaveCourseBtnProps {
    courseId: string
}

const SaveCourseBtn = ({courseId}: SaveCourseBtnProps) => {
    const dispatch = useAppDispatch();

    const savedCourses = useAppSelector((state) => state.savedCourses);
    const savedCourse = savedCourses.includes(courseId);
    
    const handleSaveCourse = () => {
        dispatch(toggleSavedCourse(courseId));
    }

    return (
        <button tabIndex={0} onClick={handleSaveCourse} className={clsx(styles.btn, styles.save)}>
            <div className={styles.icon}>
                {savedCourse ? 
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M400 480a16 16 0 0 1-10.63-4L256 357.41 122.63 476A16 16 0 0 1 96 464V96a64.07 64.07 0 0 1 64-64h192a64.07 64.07 0 0 1 64 64v368a16 16 0 0 1-16 16z"></path></svg>
                    :
                    <svg viewBox="0 0 512 512" height="24" width="24" fill="none" stroke="currentColor" stroke-width="32" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48z"/></svg>
                }
            </div>
        </button>
    );
}

export default SaveCourseBtn;