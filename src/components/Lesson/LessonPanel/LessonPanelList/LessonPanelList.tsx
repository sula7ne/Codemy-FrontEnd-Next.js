import { Dispatch, SetStateAction } from "react";

import Image from "next/image";
import clsx from "clsx";
import styles from './LessonPanelList.module.scss';
import theoryIcon from "@/assets/images/icons/theory.svg";

interface LessonPanelListProps {
    isPanelActive: boolean, 
    setIsPanelActive: Dispatch<SetStateAction<boolean>>
}

const LessonPanelList = ({isPanelActive, setIsPanelActive}: LessonPanelListProps) => {
    const handleClick = () => setIsPanelActive(prev => !prev);

    return (
        <ul className={styles.list}>
            <li 
                onClick={handleClick} 
                className={clsx(styles.item, isPanelActive && styles.active)}
            >
                <Image src={theoryIcon} alt="theory icon" />
            </li>
        </ul>
    );
}

export default LessonPanelList;