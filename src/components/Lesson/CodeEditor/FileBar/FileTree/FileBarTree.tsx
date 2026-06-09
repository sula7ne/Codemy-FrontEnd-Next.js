import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks/hooks";

import File from "@/components/Lesson/CodeEditor/FileBar/FileItem/File";
import Folder from "@/components/Lesson/CodeEditor/FileBar/Folder/Folder";
import { Lesson } from "@/types/lessons";
import NewItem from "@/components/Lesson/CodeEditor/FileBar/NewItem/NewItem";
import clsx from "clsx";
import { setSelectedItem } from "@/state/slices/activeLessonSlice";
import styles from './FileBarTree.module.scss';

interface FileBarTreeProps {
    lesson: Lesson,
    setIsCreated: Dispatch<SetStateAction<boolean>>, 
    isCreated: boolean, 
    itemType: 'FILE' | 'FOLDER'
}

const FileBarTree = ({ lesson, setIsCreated, isCreated, itemType }: FileBarTreeProps) => {
    const { fileTree, selectedItem } = useAppSelector(state => state.activeLesson);
    const [showScroll, setShowScroll] = useState(false);
    const dispatch = useAppDispatch();
    
    const handleOnClick = (e: MouseEvent<HTMLUListElement>) => {
        e.currentTarget.focus();
        e.stopPropagation();
        
        if (selectedItem.path === "." && selectedItem.type === "FOLDER") return;
        dispatch(setSelectedItem({ type: "FOLDER", path: "." })); 
    }

    return (
        <ul 
            className={clsx(styles.tree, showScroll && styles['show-scroll'])}
            onClick={handleOnClick}
            onMouseEnter={() => setShowScroll(true)}
            onMouseLeave={() => setShowScroll(false)}
            role="group"
            tabIndex={0}
        >
            {fileTree.map((el) => (
                el.type === "FILE" ? 
                    <File key={el.path} fileId={el.id} title={el.title} extension={el.extension || "unknown"} path={el.path} depth={1} />
                :
                    <Folder key={el.path} title={el.title} fileTree={el.children || []} path={el.path} depth={1} />
            ))}
            
            {isCreated && 
                <NewItem 
                    setIsCreated={setIsCreated} 
                    itemType={itemType} 
                    fileTree={fileTree}
                    selectedItem={selectedItem} 
                    depth={1}
                />
            }
        </ul>
    );
}

export default FileBarTree;