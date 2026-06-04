"use client"

import { useFormatter, useTranslations } from "next-intl";

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Image from "next/image";
import Link from "next/link";
import NotFound from "@/app/[locale]/not-found";
import defaultUserPic from "@/assets/images/default-user-profile.avif";
import styles from "./../me/Profile.module.scss";
import { useGetUserByIdQuery } from "@/state/api/usersApi";
import { useParams } from "next/navigation";

const Profile = () => {
    const t = useTranslations('Users');
    const format = useFormatter();
    
    const params = useParams();
    const id = params.id as string;
        
    const { data } = useGetUserByIdQuery(id);

    if(!data) return <NotFound/ >;

    return (
        <div className={styles.profile}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                <div className={styles['profile-content']}>
                    <div className={styles.avatar}>
                        <Image src={data.avatar || defaultUserPic} alt="profile avatar" />
                    </div>

                    <div className={styles.info}>
                        <h2 className={styles.name}>{data.name}</h2>
                        <p className={styles.email}>{data.email}</p>
                        <p className={styles.date}>
                            {t('joined', {
                                date: format.dateTime(new Date(data?.createdAt), {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                            })}
                        </p>
                    </div>
                </div>

                <div className={styles.courses}>
                    <h2 className={styles.title}>{t('coursesTitle')}</h2>
        
                    <div className={styles['courses-content']}>
                        {data.courses.length ?
                            data?.courses?.map((el) => (
                                <CourseCard key={el.id} course={el} isProgressBar={true} />
                            ))
                            :
                            <p className={styles.empty}>
                                {t.rich('coursesEmpty', {
                                    link: (chunks) => <Link href="/courses/create">{chunks}</Link>
                                })}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;