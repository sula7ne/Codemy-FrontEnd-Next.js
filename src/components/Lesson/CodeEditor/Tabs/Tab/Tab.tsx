import { MouseEvent, useEffect, useState } from "react";
import { closeTab, setActiveTab } from "@/state/slices/activeLessonSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import clsx from "clsx";
import { getIcon } from "@/utils/getIcon";
import styles from './Tab.module.scss';

interface TabProps {
    title: string,
    extension: string,
    path: string
}

const Tab = ({title, extension, path}: TabProps) => {
    const [icon, setIcon] = useState(getIcon('unknown'));
    const activeTab = useAppSelector(state => state.activeLesson.activeTab);
    const dispatch = useAppDispatch();
                
    const handleClickTab = () => {
        if (activeTab === path) return;
        
        dispatch(setActiveTab(path));
    }
    const handleCloseTab = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(closeTab(path));
    }

    useEffect(() => {
        setIcon(getIcon(extension));
    }, [extension]);

    return (
        <div className={clsx(styles.tab, activeTab === path && styles.active)} onClick={handleClickTab} role="tab">
            <div className={styles.icon}>
                <Image width={16} height={16} src={icon} alt="tab" />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={clsx(styles.exit, 'codicon', 'codicon-close')} onClick={handleCloseTab} role="button"></div>
        </div> 
    );
}

export default Tab;