import { setIsActive, setIsExpanded, setIsFixed } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Link from "next/link";
import clsx from "clsx";
import { sidebar } from "@/data/sidebar";
import styles from './Sidebar.module.scss';
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const { isActive, isFixed, isExpanded } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    if(!isActive) return null;

    const handleOnClickOverlay = () => {
        dispatch(setIsExpanded(false));
        dispatch(setIsActive(false));
        dispatch(setIsFixed(false));
    }

    return (
        <>
            <nav className={clsx(styles.sidebar, isFixed && styles.fixed, isExpanded ? styles.expanded : styles.collapsed)}>
                <ul className={styles.list}>
                    {sidebar.map((el) => {
                        const isLinkActive = pathname === el.path || (el.path !== '/' && pathname.startsWith(el.path));

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

export default Sidebar;