"use client"

import CourseAuthor from "@/components/Course/CourseAuthor/CourseAuthor";
import Image from "next/image";
import NotFound from "@/components/NotFound/NotFound";
import SaveCourseBtn from "@/components/Course/CourseBtns/SaveCourseBtn";
import StartCourseBtn from "@/components/Course/CourseBtns/StartCourseBtn";
import { authors } from "@/data/authors";
import languageIcon from "@/assets/images/icons/language.svg";
import levelIcon from "@/assets/images/icons/level.svg";
import starIcon from "@/assets/images/icons/star.svg";
import styles from "./CourseHeader.module.scss";
import timeIcon from "@/assets/images/icons/time.svg";
import { useAppSelector } from "@/state/hooks";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const CourseHeader = () => {
    const t = useTranslations('Course');
    const courses = useAppSelector((state) => state.courses);
    const params = useParams();
    const id = params.id as string;
    if(!id) return <NotFound />;

    const activeCourse = courses.find(el => el.id === id);
    if(!activeCourse) return <NotFound />;

    const author = authors.find(el => el.id === activeCourse.authorId);
    if(!author) return <NotFound />;

    const reviewsCount = activeCourse.ratingsCount ?? 0;
    
    // I need to unite activeLessonSlice and userCoursesSlice, so i have to delete activeLessonSlice

    return (
        <div className={styles.header}>
            <div className={styles.cover}>
                <Image width={355} height={200} src={activeCourse.cover} alt={author.name} />
            </div>
            
            <div className={styles.info}>
                <h1 className={styles.title}>{activeCourse.title}</h1>

                {/* <div className="course__info-author">
                    <Link href={`/authors/${activeCourse.authorId}`} className="author__img-link">
                        <Image width={30} height={30} className="course__author-img" src={author.avatar} alt={author.name} />
                    </Link>
                    <Link href={`/authors/${activeCourse.authorId}`} className="course__author-name">{author.name}</Link>
                </div> */}
                <CourseAuthor authorId={activeCourse.authorId} />

                <p className={styles.description}>{activeCourse.description}</p>

                <div className={styles.actions}>
                    <StartCourseBtn activeCourse={activeCourse}/>

                    <SaveCourseBtn courseId={id} />
                </div>
            </div>

            <div className={styles.more}>
                <div className={styles.rating}>
                    <div className={styles.value}>
                        {activeCourse.rating} 
                        <Image src={starIcon} alt="rating" />
                    </div>
                    <div className={styles.count}>{t('reviews', { count: reviewsCount })}</div>
                </div>

                <div className={styles.language}>
                    <div className={styles.icon}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeWidth="2" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8"></path></svg>
                    </div>
                    {activeCourse.language}
                </div>
                <div className={styles.level}>
                    <div className={styles.icon}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path></svg>
                    </div>
                    {activeCourse.level}
                </div>
                {/* ВРЕМЯ <div className={styles.time}>
                    <Image src={timeIcon} alt="time" />
                    {activeCourse.time}
                </div> */}

                {/* or button here */}
                {/* <div className={styles.level}>{activeCourse.level} • {activeCourse.time}</div> */}
            </div>
        </div>
    );
}

export default CourseHeader;