import { setIsActive, setIsExpanded, setIsFixed, setIsOverlay } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import Accordion from "@/components/Accordion/AccordionLesson/Accordion";
import HeaderActions from "./HeaderActions/HeaderActions";
import Link from "next/link";
import MenuBtn from "@/components/Menu/MenuBtn";
import NotFound from "@/app/[locale]/not-found";
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import Search from "@/components/Search/Search";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { useParams } from "next/navigation";
import { useState } from "react";

const LessonHeader = () => {
    const params = useParams();
    const id = params.id as string;

    const { isOverlay } = useAppSelector((state) => state.sidebar);

    const lesson = useAppSelector((state) => state.lessons).find(el => el.id === id);

    const [isDropDown, setIsDropDown] = useState(false);
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

                <div className={styles.accordion} onMouseEnter={() => setIsDropDown(true)} onMouseLeave={() => setIsDropDown(false)}>
                    <Link className={styles.open} href={`/courses/${1}`}>
                        <span>HTML</span>
                        <span>{lesson?.title}</span>
                    </Link>

                    {isDropDown && <div className={styles.dropdown}>
                        <Accordion sections={["4", "5"]} />
                    </div>}
                </div>
            </div>

            <div className={styles.right}>
                <HeaderActions />
            </div>
        </header>
    );
}

export default LessonHeader;