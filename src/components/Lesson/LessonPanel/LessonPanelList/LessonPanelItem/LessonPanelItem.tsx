import Image from "next/image";
import clsx from "clsx";
import styles from './LessonPanelItem.module.scss';
import { lessonPanel } from "@/types/lessonPanel";

interface LessonPanelItemProps {
    item: lessonPanel,
    isActive: boolean,
    onClick: () => void
}

const LessonPanelItem = ({ item, isActive, onClick }: LessonPanelItemProps) => {
    return (
        <li 
            onClick={onClick} 
            className={clsx(styles.item, isActive && styles.active)}
        >
            {item.icon}
            {/* <Image src={item.icon} alt={`${item.label} icon`} /> */}
        </li>
    );
}

export default LessonPanelItem;