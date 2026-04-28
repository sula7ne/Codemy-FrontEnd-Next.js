import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Link from "next/link";
import MenuBtn from "@/components/Menu/MenuBtn";
import Search from "@/components/Search/Search";
import clsx from "clsx";
import styles from "./Header.module.scss";

const Header = () => {
    const { isOverlay } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        if(isOverlay) {
            dispatch(setIsActive(true));
            dispatch(setIsOverlay(false));
            dispatch(setIsFixed(false));
            dispatch(setIsExpanded(false));
        }
    }

    return (
        <header className={styles.header}>
            {/* <div className={clsx(styles.left, isExpanded && styles.expanded)}></div> */}
            <div className={styles.left}>
                <MenuBtn />
                
                <h1 className={styles.title}>
                    <Link className={styles.link} onClick={handleOnClick} href="/">
                        CODEMY
                        {/* <span className={styles.country}>KZ</span> */}
                    </Link>
                </h1>
            </div>

            <div className={styles.center}>
                <Search />
            </div>

            <div className={styles.right}>
                <button tabIndex={0}>
                    <div className={styles.icon}>
                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 016.447 15.276 7 7 0 00-12.895 0A9 9 0 0112 3Zm0 2a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-.1 9.001L11.899 16a5 5 0 014.904 3.61A8.96 8.96 0 0112 21a8.96 8.96 0 01-4.804-1.391 5 5 0 014.704-3.608Z"></path></svg>
                    </div>
                    <span>Войти</span>
                </button>
            </div>
        </header>
    );
}

export default Header;