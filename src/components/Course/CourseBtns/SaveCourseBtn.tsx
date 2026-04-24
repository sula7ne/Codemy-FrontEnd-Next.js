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
            <Image src={savedCourse ? saveActiveIcon : saveIcon} alt={`${savedCourse ? 'un' : ''}save course`} />
        </button>
    );
}

export default SaveCourseBtn;