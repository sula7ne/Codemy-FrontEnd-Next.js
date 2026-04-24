import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import clsx from "clsx";
import { course } from "@/types/course";
import { startCourse } from "@/state/slices/userCoursesSlice";
import styles from "./CourseBtns.module.scss";
import { useRouter } from "next/navigation";
import videoPlayIcon from "@/assets/images/icons/video-play.svg";

export interface StartCourseBtnProps {
    activeCourse: course
};

const StartCourseBtn = ({activeCourse}: StartCourseBtnProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const userCourse = useAppSelector((state) => state.userCourses).find(el => el.courseId === activeCourse.id);

    const handleStartCourse = () => {
        if(!userCourse) {
            dispatch(startCourse({
                courseId: activeCourse.id,
                lastLessonId: activeCourse.lessons[0]
            }));
            
            router.push(`/lessons/${activeCourse.lessons[0]}`);
        } else {
            router.push(`/lessons/${userCourse.lastLessonId}`);
        }
    }

    return (
        <button tabIndex={0} onClick={handleStartCourse} className={clsx(styles.btn, styles.start)}>
            <Image src={videoPlayIcon} alt="start course" />
            {/* Продолжить взависимости от state */}
            {userCourse ? "Продолжить обучение" : "Начать обучение"}
        </button>
    );
}

export default StartCourseBtn;