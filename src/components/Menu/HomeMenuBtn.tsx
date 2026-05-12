import { setIsActive, setIsExpanded, setIsFixed } from "@/state/slices/ui/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import clsx from "clsx";
import styles from './MenuBtn.module.scss';

// import menuIcon from "./../assets/images/icons/menu.svg"

const HomeMenuBtn = () => {
    const { isExpanded, isFixed, isOverlay, isActive } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
    
    const handleOnClick = () => {
        dispatch(setIsExpanded(!isExpanded));

        if(isOverlay) {
            dispatch(setIsFixed(!isFixed));
            dispatch(setIsActive(!isActive));
        }
    }
    
    return (
        <button className={styles['menu-btn']} tabIndex={0} onClick={handleOnClick}>
            <div className={clsx(styles.icon, isExpanded ? styles.expanded : styles.collapsed)}>
                {/* <img src={menuIcon} alt="menu icon" /> */}
                <div className={styles['icon-line']}></div>
                <div className={styles['icon-line']}></div>
                <div className={styles['icon-line']}></div>
            </div>
        </button>
    );
}

export default HomeMenuBtn;