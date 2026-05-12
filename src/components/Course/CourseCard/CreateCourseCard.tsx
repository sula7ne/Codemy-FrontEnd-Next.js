import CourseAuthor from "../CourseAuthor/CourseAuthor";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { authors } from "@/data/authors";
import { course } from "@/types/course";
import starIcon from "@/assets/images/icons/star.svg";
import styles from "./CourseCard.module.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export interface CreateCourseCardProps {
    course: course
};

const CreateCourseCard = ({ course }: CreateCourseCardProps) => {
    const t = useTranslations('Course');
    const author = authors.find(el => el.id === course.authorId);
    const router = useRouter();
    
    if(!author) return null;
    
    const handleOnClickCourse = () => {
        router.push(`/courses/${course.id}/create`);
    }

    const handleOnClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    const reviewsCount = course.ratingsCount ?? 0;

    // внутри а при target="_blank" rel="noopener noreferrer"
    // level, language

    return (
        <div className={styles.card} onClick={handleOnClickCourse}>
            <Link className={styles.cover} onClick={handleOnClickLink} href={`/courses/${course.id}/create`} tabIndex={-1} >
                <Image width={355} height={200} src={course.cover} alt={author.name} />
                {/* <div className={styles.time}>{course.time}</div> */}
            </Link>
            
            <div className={styles.info}>
                <h3 className={styles.title} title={course.title} aria-label={course.title}>
                    <Link onClick={handleOnClickLink} href={`/courses/${course.id}/create`}>{course.title}</Link>
                </h3>
                
                <p className={styles.description} title={course.description} aria-label={course.description}>{course.description}</p>
                
                <CourseAuthor authorId={course.authorId} />

                <div className={styles.rating}>
                    <div className={styles.value}>
                        {course.rating} 
                        <Image src={starIcon} alt="rating" />
                    </div>
                    <div>•</div>
                    <div className={styles.count}>{t('reviews', { count: reviewsCount })}</div>
                    <div>•</div>
                    <div className={styles.level}>
                        {t(`levels.${course.level}`)}
                        <div className={styles.icon}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCourseCard;