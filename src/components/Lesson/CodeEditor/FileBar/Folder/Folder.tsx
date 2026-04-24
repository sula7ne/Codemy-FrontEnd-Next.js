import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import FolderList from "../FolderList";
import clsx from "clsx";
import { item } from "@/types/fileTree";
import { setSelectedItem } from "@/state/slices/activeLessonSlice";
import styles from './Folder.module.scss';

interface FolderProps {
    title: string,
    children: item[],
    path: string
}

const Folder = ({title, children, path}: FolderProps) => {
    const selectedItem = useAppSelector(state => state.activeLesson.selectedItem);
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        setIsExpanded((prev) => !prev);

        if (selectedItem.path === path && selectedItem.type === "folder") return;
        dispatch(setSelectedItem({ type: "folder", path }));        
    }

    return (
         <li className="files__tree-item" role="tree-item" aria-expanded="true">
            <div className={styles.folder}>
                <div className={styles.header} onClick={handleOnClick} role="button" tabIndex={0} >
                    <div className={styles.indent} style={{width: "0px"}}></div>
                    {/* collapsed */}
                    <div className={clsx(styles.icon, !isExpanded && styles.collapsed, 'codicon', 'codicon-tree-item-expanded')}></div>
                    <div className={styles.title}>{title}</div>
                </div>
            
                {isExpanded && 
                    // <ul className="folder__list" role="goup">
                    //     {children.map((el) => (
                    //         <FileItem key={el.path} title={el.title} extension={el.extension} path={el.path} isFolder={true} />
                    //     ))}
                    // </ul>
                    // <FileTree fileTree={children} isFolder={true} isCreated={false} />
                    <FolderList fileTree={children} />
                }
                
            </div>
        </li>
    );
}

export default Folder;