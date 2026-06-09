import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import Image from "next/image";
import { MouseEvent } from "react";
import clsx from "clsx";
import { getIcon } from "@/utils/getIcon";
import { openTab } from "@/state/slices/activeLessonSlice";
import styles from './File.module.scss';
import { useDeleteFileMutation } from "@/state/api/lessonsApi";
import { useParams } from "next/navigation";

interface FileProps {
    fileId: string,
    title: string, 
    extension: string, 
    path: string,
    isFolder?: boolean,
    depth: number
}

const File = ({ fileId, title, extension, path, isFolder=false, depth }: FileProps) => {
    const { activeTab } = useAppSelector(state => state.activeLesson);
    const params = useParams();
    const lessonId = params.id as string;
    const dispatch = useAppDispatch();
    
    const [deleteFile] = useDeleteFileMutation();
    
    const icon = getIcon(extension);

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (activeTab === path) return;
        dispatch(openTab({title, extension, path}));       
    }

    const indentPadding = ((depth - 1) * 8) + 14;

    const clickDelete = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        try {
            await deleteFile({ lessonId, fileId }).unwrap();
        } catch(e) {
            console.error('Delete file error:', e);
        }
    }

    return (
        <li className="files__tree-item" role="treeitem" aria-selected="false">
            <div className={clsx(styles.file, activeTab === path && styles.active)} onClick={handleOnClick} tabIndex={0}>
                {/* {depth > 1 && Array.from({ length: depth }).map((_, index) => (
                    <div 
                        key={index} 
                        className={styles['indent-guide']} 
                        style={{ left: `${(index + 1) * 8 + 12}px` }} 
                    />
                ))} */}
                
                <div className={styles.contentWrapper} style={{ paddingLeft: `${indentPadding}px` }}>
                    <div className={styles.content}>
                        <div className={styles.icon}>
                            <Image src={icon} alt="file icon" width={16} height={16} />
                        </div>
                        
                        <div className={styles.title}>{title}</div>

                        <div onClick={clickDelete} className={styles.delete} >
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" focusable="false" aria-hidden="true"><path d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default File;