import { Dispatch, SetStateAction } from "react";

import styles from './LessonPanelList.module.scss';
import { lessonPanel } from "@/data/lessonPanel";
import LessonPanelItem from "./LessonPanelItem/LessonPanelItem";
import { lessonPanelId } from "@/types/lessonPanel";

interface LessonPanelListProps {
    panel: lessonPanelId | null, 
    setPanel: Dispatch<SetStateAction<lessonPanelId | null>>
}

const LessonPanelList = ({ panel, setPanel }: LessonPanelListProps) => {
    return (
        <ul className={styles.list}>
            {lessonPanel.map((el) => (
                <LessonPanelItem key={el.id} item={el} isActive={panel === el.id} onClick={() => setPanel(panel === el.id ? null : el.id)} />
            ))}
        </ul>
    );
}

export default LessonPanelList;