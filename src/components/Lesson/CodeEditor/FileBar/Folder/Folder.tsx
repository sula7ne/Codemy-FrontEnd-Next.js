import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import { FileTreeNode } from "@/types/lessons";
import FolderList from "../FolderList";
import clsx from "clsx";
import { setSelectedItem } from "@/state/slices/activeLessonSlice";
import styles from './Folder.module.scss';

interface FolderProps {
    title: string,
    fileTree: FileTreeNode[],
    path: string,
    depth: number
}

const Folder = ({ title, fileTree, path, depth }: FolderProps) => {
    const selectedItem = useAppSelector(state => state.activeLesson.selectedItem);
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        setIsExpanded((prev) => !prev);

        if (selectedItem.path === path && selectedItem.type === "FOLDER") return;
        dispatch(setSelectedItem({ type: "FOLDER", path }));        
    }

    const indentPadding = (depth - 1) * 8;

    return (
         <li className="files__tree-item" role="tree-item" aria-expanded="true">
            <div className={styles.folder}>
                <div className={styles.header} onClick={handleOnClick} role="button" tabIndex={0}>
                    {/* {Array.from({ length: depth  }).map((_, index) => (
                        <div 
                            key={index} 
                            className={styles['indent-guide']} 
                            style={{ left: `${(index + 1) * 8 + 4}px` }} 
                        />
                    ))} */}

                    <div className={styles.contentWrapper} style={{ paddingLeft: `${indentPadding}px` }}>
                        <div className={clsx(styles.icon, !isExpanded && styles.collapsed, 'codicon', 'codicon-tree-item-expanded')}></div>
                        <div className={styles.title}>{title}</div>
                    </div>
                </div>
            
                {isExpanded && 
                    // <ul className="folder__list" role="goup">
                    //     {children.map((el) => (
                    //         <FileItem key={el.path} title={el.title} extension={el.extension} path={el.path} isFolder={true} />
                    //     ))}
                    // </ul>
                    // <FileTree fileTree={children} isFolder={true} isCreated={false} />
                    <FolderList fileTree={fileTree} depth={depth+1} />
                }
                
            </div>
        </li>
    );
}

export default Folder;