import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import Image from "next/image";
import clsx from "clsx";
import { course } from "@/types/course";
import { startCourse } from "@/state/slices/userCoursesSlice";
import styles from "./CourseBtns.module.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import videoPlayIcon from "@/assets/images/icons/video-play.svg";

export interface StartCourseBtnProps {
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
    handleStartCourse: () => void
};

const StartCourseBtn = ({ status, handleStartCourse }: StartCourseBtnProps) => {
    const t = useTranslations('Course');

    return (
        <button tabIndex={0} onClick={handleStartCourse} className={clsx(styles.btn, styles.start)}>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"><path d="M6 3.375 21 12 6 20.625V3.375Z" fill="currentColor"/></svg>
            </div>
            {/* Продолжить взависимости от state */}
            {/* {status === "IN_PROGRESS" ? t('actions.continue') : t('actions.start')} */}
            {t(`actions.${status}`)}
        </button>
    );
}

export default StartCourseBtn;