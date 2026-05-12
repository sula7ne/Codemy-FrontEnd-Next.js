import Link from "next/link";
import styles from "./ProfileDropDown.module.scss";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import defaultUserPic from "@/assets/images/default-user-profile.avif";
import { useTranslations } from "next-intl";

const ProfileDropDown = () => {
    const t = useTranslations('Header');
    const [isDropDown, setIsDropDown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropDown = () => setIsDropDown(false);

    const signOut = () => {
        alert('sign out');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropDown();
            }
        };

        if (isDropDown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropDown]);

    return (
        <div ref={dropdownRef}>
            <button className={clsx(styles['profile-btn'], isDropDown && styles.focus)} onClick={() => setIsDropDown(!isDropDown)} tabIndex={0}>
                <Image src={defaultUserPic} alt="profile picture" />
            </button>

            {isDropDown && 
                <ul className={styles.dropdown}>
                    <li onClick={closeDropDown}>
                        <Link className={styles.link} href={"/profile"}>
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="currentcolor" width="24" focusable="false" aria-hidden="true"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 016.447 15.276 7 7 0 00-12.895 0A9 9 0 0112 3Zm0 2a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-.1 9.001L11.899 16a5 5 0 014.904 3.61A8.96 8.96 0 0112 21a8.96 8.96 0 01-4.804-1.391 5 5 0 014.704-3.608Z"></path></svg>
                            </div>
                            {t('profileDropDown.profile')}
                        </Link>
                    </li>
                    <li onClick={closeDropDown}>
                        <Link className={styles.link} href={"/settings"}>
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="currentcolor" width="24" focusable="false" aria-hidden="true"><path d="M12.844 1h-1.687a2 2 0 00-1.962 1.616 3 3 0 01-3.92 2.263 2 2 0 00-2.38.891l-.842 1.46a2 2 0 00.417 2.507 3 3 0 010 4.525 2 2 0 00-.417 2.507l.843 1.46a2 2 0 002.38.892 3.001 3.001 0 013.918 2.263A2 2 0 0011.157 23h1.686a2 2 0 001.963-1.615 3.002 3.002 0 013.92-2.263 2 2 0 002.38-.892l.842-1.46a2 2 0 00-.418-2.507 3 3 0 010-4.526 2 2 0 00.418-2.508l-.843-1.46a2 2 0 00-2.38-.891 3 3 0 01-3.919-2.263A2 2 0 0012.844 1Zm-1.767 2.347a6 6 0 00.08-.347h1.687a4.98 4.98 0 002.407 3.37 4.98 4.98 0 004.122.4l.843 1.46A4.98 4.98 0 0018.5 12a4.98 4.98 0 001.716 3.77l-.843 1.46a4.98 4.98 0 00-4.123.4A4.979 4.979 0 0012.843 21h-1.686a4.98 4.98 0 00-2.408-3.371 4.999 4.999 0 00-4.12-.399l-.844-1.46A4.979 4.979 0 005.5 12a4.98 4.98 0 00-1.715-3.77l.842-1.459a4.98 4.98 0 004.123-.399 4.981 4.981 0 002.327-3.025ZM16 12a4 4 0 11-7.999 0 4 4 0 018 0Zm-4 2a2 2 0 100-4 2 2 0 000 4Z"></path></svg>
                            </div>
                            {t('profileDropDown.settings')}
                        </Link>
                    </li>
                    <li className={styles.exit} onClick={closeDropDown}>
                        <button className={styles.link} onClick={signOut}>
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="currentcolor" width="24" focusable="false" aria-hidden="true"><path d="M19 2a2 2 0 012 2v16a2 2 0 01-2 2H9a1 1 0 010-2h10V4H9a1 1 0 010-2h10ZM9.293 7.293a1 1 0 000 1.414L11.586 11H4a1 1 0 000 2h7.586l-2.293 2.293a1 1 0 101.414 1.414L15.414 12l-4.707-4.707a1 1 0 00-1.414 0Z"></path></svg>
                            </div>
                            {t('profileDropDown.logout')}
                        </button>
                    </li>
                </ul>
            }
        </div>
    );
}

export default ProfileDropDown;