"use client"

import { useFormatter, useTranslations } from "next-intl";

import Image from "next/image";
import defaultUserPic from "@/assets/images/default-user-profile.avif";
import styles from "./Profile.module.scss";

const Profile = () => {
    const t = useTranslations('Profile');
    const format = useFormatter();

    const joinDate = new Date('2025-10-27');

    return (
        <div className={styles.profile}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                <div className={styles['profile-content']}>
                    <div className={styles.avatar}>
                        <Image src={defaultUserPic} alt="profile avatar" />
                    </div>

                    <div className={styles.info}>
                        <h2 className={styles.username}>@username</h2>
                        <p className={styles.email}>sula7ne@gmail.com</p>
                        <p className={styles.date}>
                            {t('joined', {
                                date: format.dateTime(joinDate, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;