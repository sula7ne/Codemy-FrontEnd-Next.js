import CourseAuthor from "../CourseAuthor/CourseAuthor";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { authors } from "@/data/authors";
import { course } from "@/types/course";
import starIcon from "@/assets/images/icons/star.svg";
import styles from "./CourseCard.module.scss";
import { useRouter } from "next/navigation";

export interface CourseCardProps {
    course: course
};

const CourseCard = ({course}: CourseCardProps) => {
    const author = authors.find(el => el.id === course.authorId);
    const router = useRouter();
    
    if(!author) return null;
    
    const handleOnClickCourse = () => {
        router.push(`/courses/${course.id}`);
    }

    const handleOnClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    // внутри а при target="_blank" rel="noopener noreferrer"
    // level, language

    return (
        <div className={styles.card} onClick={handleOnClickCourse}>
            <Link className={styles.cover} onClick={handleOnClickLink} href={`/courses/${course.id}`} tabIndex={-1} >
                <Image width={355} height={200} src={course.cover} alt={author.name} />
                {/* <div className={styles.time}>{course.time}</div> */}
            </Link>
            
            <div className={styles.info}>
                <h3 className={styles.title} title={course.title} aria-label={course.title}>
                    <Link onClick={handleOnClickLink} href={`/courses/${course.id}`}>{course.title}</Link>
                </h3>
                
                <p className={styles.description} title={course.description} aria-label={course.description}>{course.description}</p>
                
                <CourseAuthor authorId={course.authorId} />

                <div className={styles.rating}>
                    <span className={styles.value}>
                        {course.rating} 
                        <Image src={starIcon} alt="rating" />
                    </span>
                    <span>•</span>
                    <span className={styles.count}>{(course.ratingsCount ?? 0).toLocaleString('ru-RU')} отзывов</span>
                </div>

                <div className={styles.level}>{course.level} • {course.time}</div>
            </div>
        </div>
    );
}

export default CourseCard;