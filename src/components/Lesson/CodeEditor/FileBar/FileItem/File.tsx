import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import { MouseEvent } from "react";
import clsx from "clsx";
import { getIcon } from "@/utils/getIcon";
import { openTab } from "@/state/slices/activeLessonSlice";
import styles from './File.module.scss';

interface FileProps {
    title: string, 
    extension: string, 
    path: string,
    isFolder?: boolean
}

const File = ({title, extension, path, isFolder=false}: FileProps) => {
    const { activeTab } = useAppSelector(state => state.activeLesson);
    const dispatch = useAppDispatch();
    
    const icon = getIcon(extension);

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (activeTab === path) return;
        dispatch(openTab({title, extension, path}));       
    }

    return (
        <li className="files__tree-item" role="treeitem" aria-selected="false">
            <div className={clsx(styles.file, activeTab === path && styles.active)} onClick={handleOnClick} tabIndex={0}>
                {isFolder ?
                        <>
                            <div className={styles.indent} style={{width: "8px"}}>
                                <div className={clsx(styles.guide, styles.active)} style={{width: "8px"}}></div>
                            </div>
                            <div className={styles.twistie} style={{paddingLeft: "16px"}}></div>
                        </>
                    :
                        <>
                            <div className={styles.indent} style={{width: "0px"}}></div>
                            <div className={styles.twistie} style={{paddingLeft: "8px"}}></div>
                        </>
                }
                
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <Image src={icon} alt="file icon" />
                    </div>
                    <div className={styles.title}>{title}</div>
                </div>
            </div>
        </li>
    );
}

export default File;