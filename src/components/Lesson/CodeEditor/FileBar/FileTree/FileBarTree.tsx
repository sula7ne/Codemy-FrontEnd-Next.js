import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import File from "@/components/Lesson/CodeEditor/FileBar/FileItem/File";
import Folder from "@/components/Lesson/CodeEditor/FileBar/Folder/Folder";
import NewItem from "@/components/Lesson/CodeEditor/FileBar/NewItem/NewItem";
import clsx from "clsx";
import { setSelectedItem } from "@/state/slices/activeLessonSlice";
import styles from './FileBarTree.module.scss';

interface FileBarTreeProps {
    setIsCreated: Dispatch<SetStateAction<boolean>>, 
    isCreated: boolean, 
    itemType: 'file' | 'folder'
}

const FileBarTree = ({setIsCreated, isCreated, itemType}: FileBarTreeProps) => {
    const { fileTree, selectedItem } = useAppSelector(state => state.activeLesson);
    const [showScroll, setShowScroll] = useState(false);
    const dispatch = useAppDispatch();
    
    const handleOnClick = (e: MouseEvent<HTMLUListElement>) => {
        e.currentTarget.focus();
        e.stopPropagation();
        
        if (selectedItem.path === "." && selectedItem.type === "folder") return;
        dispatch(setSelectedItem({ type: "folder", path: "." })); 
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
                el.type === "file" ? 
                    <File key={el.path} title={el.title} extension={el.extension} path={el.path} />
                :
                    <Folder key={el.path} title={el.title} children={el.children} path={el.path} />
            ))}
            
            {isCreated && 
                <NewItem 
                    setIsCreated={setIsCreated} 
                    itemType={itemType} 
                    fileTree={fileTree}
                    selectedItem={selectedItem} 
                />
            }
        </ul>
    );
}

export default FileBarTree;