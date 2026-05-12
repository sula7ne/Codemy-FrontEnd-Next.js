import { setIsActive, setIsExpanded, setIsFixed } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Link from "next/link";
import clsx from "clsx";
import styles from './Sidebar.module.scss';
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { sidebar as sidebarType } from "@/types/sidebar";

const HomeSidebar = () => {
    const locale = useLocale();
    const t = useTranslations('Sidebar');
    const { isActive, isFixed, isExpanded } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    if(!isActive) return null;

    const sidebar: sidebarType[] = [
        {
            id: "courses",
            path: "/courses",
            label: t('courses'), // io5 school
            icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 192 256 64l224 128-224 128L32 192z"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 240v128l144 80 144-80V240m80 128V192M256 320v128"></path></svg>,
            activeIcon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M256 368a16 16 0 0 1-7.94-2.11L108 285.84a8 8 0 0 0-12 6.94V368a16 16 0 0 0 8.23 14l144 80a16 16 0 0 0 15.54 0l144-80a16 16 0 0 0 8.23-14v-75.22a8 8 0 0 0-12-6.94l-140.06 80.05A16 16 0 0 1 256 368z"></path><path d="M495.92 190.5v-.11a16 16 0 0 0-8-12.28l-224-128a16 16 0 0 0-15.88 0l-224 128a16 16 0 0 0 0 27.78l224 128a16 16 0 0 0 15.88 0L461 221.28a2 2 0 0 1 3 1.74v144.53c0 8.61 6.62 16 15.23 16.43A16 16 0 0 0 496 368V192a14.76 14.76 0 0 0-.08-1.5z"></path></svg>
        },
        {
            id: "my-learning",
            path: "/my-learning",
            label: t('my-learning'), // io5 book
            icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96zm0 0v288"></path></svg>,
            activeIcon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M202.24 74C166.11 56.75 115.61 48.3 48 48a31.36 31.36 0 0 0-17.92 5.33A32 32 0 0 0 16 79.9V366c0 19.34 13.76 33.93 32 33.93 71.07 0 142.36 6.64 185.06 47a4.11 4.11 0 0 0 6.94-3V106.82a15.89 15.89 0 0 0-5.46-12A143 143 0 0 0 202.24 74zm279.68-20.7A31.33 31.33 0 0 0 464 48c-67.61.3-118.11 8.71-154.24 26a143.31 143.31 0 0 0-32.31 20.78 15.93 15.93 0 0 0-5.45 12v337.13a3.93 3.93 0 0 0 6.68 2.81c25.67-25.5 70.72-46.82 185.36-46.81a32 32 0 0 0 32-32v-288a32 32 0 0 0-14.12-26.61z"></path></svg>,
        },
        {
            id: "saved-courses",
            path: "/saved-courses",
            label: t('saved-courses'), // io5 book
            icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48z"></path></svg>,
            activeIcon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M400 480a16 16 0 0 1-10.63-4L256 357.41 122.63 476A16 16 0 0 1 96 464V96a64.07 64.07 0 0 1 64-64h192a64.07 64.07 0 0 1 64 64v368a16 16 0 0 1-16 16z"></path></svg>
        },
    ];

    const handleOnClickOverlay = () => {
        dispatch(setIsExpanded(false));
        dispatch(setIsActive(false));
        dispatch(setIsFixed(false));
    }

    return (
        <>
            <nav className={clsx(styles.sidebar, styles.fixed, isExpanded ? styles.expanded : styles.disabled, styles.home)}>
                <ul className={styles.list}>
                    {sidebar.map((el) => {
                        const isLinkActive = pathname === `/${locale}${el.path}` || pathname === el.path || (el.path !== '/' && pathname.startsWith(`/${locale}${el.path}`));

                        return (
                            <li key={el.id} className={styles.item} title={el.label} aria-label={el.label}>
                                <Link 
                                    href={el.path} 
                                    className={clsx(styles.link, isLinkActive && styles.active)}
                                >
                                    <div className={styles.icon}>
                                        {isLinkActive ? el.activeIcon : el.icon}
                                    </div>
                                    <div className={styles.title}>{el.label}</div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {isFixed && <div className={styles.overlay} onClick={handleOnClickOverlay}></div>}
        </>
    );
}

export default HomeSidebar;