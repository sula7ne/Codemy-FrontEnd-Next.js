"use client"

import Accordion from "@/components/Accordion/Accordion";
import CourseAuthor from "@/components/Course/CourseAuthor/CourseAuthor";
import Image from "next/image";
import NotFound from "@/components/NotFound/NotFound";
import SaveCourseBtn from "@/components/Course/CourseBtns/SaveCourseBtn";
import StartCourseBtn from "@/components/Course/CourseBtns/StartCourseBtn";
import { authors } from "@/data/authors";
import languageIcon from "@/assets/images/icons/language.svg";
import levelIcon from "@/assets/images/icons/level.svg";
import starIcon from "@/assets/images/icons/star.svg";
import styles from "./Course.module.scss";
import timeIcon from "@/assets/images/icons/time.svg";
import { useAppSelector } from "@/state/hooks";
import { useParams } from "next/navigation";

const Course = () => {
    const courses = useAppSelector((state) => state.courses);
    
    const params = useParams();
    const id = params.id as string;
    if(!id) return <NotFound />;
    

    const activeCourse = courses.find(el => el.id === id);
    if(!activeCourse) return <NotFound />;

    const author = authors.find(el => el.id === activeCourse.authorId);
    if(!author) return <NotFound />;
    
    // I need to unite activeLessonSlice and userCoursesSlice, so i have to delete activeLessonSlice

    return (
        <div className={styles.course}>
            <div className={styles.content}>
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
                        <div className={styles.count}>{(activeCourse.ratingsCount ?? 0).toLocaleString('ru-RU')} отзывов</div>
                    </div>

                    <div className={styles.language}>
                        <Image src={languageIcon} alt="sound-language" />
                        {activeCourse.language}
                    </div>
                    <div className={styles.level}>
                        <Image src={levelIcon} alt="level" />
                        {activeCourse.level}
                    </div>
                    <div className={styles.time}>
                        <Image src={timeIcon} alt="time" />
                        {activeCourse.time}
                    </div>

                    {/* or button here */}
                    {/* <div className={styles.level}>{activeCourse.level} • {activeCourse.time}</div> */}
                </div>
            </div>

            <Accordion sections={activeCourse.sections} />
        </div>
    );
}

export default Course;