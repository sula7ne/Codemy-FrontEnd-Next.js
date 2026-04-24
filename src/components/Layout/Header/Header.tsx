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
                
            </div>
        </header>
    );
}

export default Header;