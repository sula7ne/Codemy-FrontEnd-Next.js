import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { authors } from "@/data/authors";
import styles from "./CourseAuthor.module.scss";

export interface CourseAuthorProps {
    authorId: string
};

const CourseAuthor = ({ authorId }: CourseAuthorProps) => {
    const author = authors.find(el => el.id === authorId);
    
    if(!author) return null;
    
    const handleOnClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    return (
        <div className={styles.author}>
            <Link className={styles.link} onClick={handleOnClickLink} href={`/authors/${authorId}`}>
                <Image width={30} height={30} src={author.avatar} alt={author.name} />
            </Link>
            <Link className={styles.name} onClick={handleOnClickLink} href={`/authors/${authorId}`}>{author.name}</Link>
        </div>
    );
}

export default CourseAuthor;