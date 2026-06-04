import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import HeaderActions from "./HeaderActions/HeaderActions";
import HomeMenuBtn from "@/components/Menu/HomeMenuBtn";
import Link from "next/link";
import MenuBtn from "@/components/Menu/MenuBtn";
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import Search from "@/components/Search/Search";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { useTranslations } from "next-intl";

const HomeHeader = () => {
    const t = useTranslations('Header');
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
                <HomeMenuBtn />
                
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
                <HeaderActions />
            </div>
        </header>
    );
}

export default HomeHeader;