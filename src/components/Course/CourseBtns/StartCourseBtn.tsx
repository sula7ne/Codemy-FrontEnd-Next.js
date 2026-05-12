import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import clsx from "clsx";
import { course } from "@/types/course";
import { startCourse } from "@/state/slices/userCoursesSlice";
import styles from "./CourseBtns.module.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import videoPlayIcon from "@/assets/images/icons/video-play.svg";

export interface StartCourseBtnProps {
    activeCourse: course
};

const StartCourseBtn = ({activeCourse}: StartCourseBtnProps) => {
    const t = useTranslations('Course');
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
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"><path d="M6 3.375 21 12 6 20.625V3.375Z" fill="currentColor"/></svg>
            </div>
            {/* Продолжить взависимости от state */}
            {userCourse ? t('actions.continue') : t('actions.start')}
        </button>
    );
}

export default StartCourseBtn;