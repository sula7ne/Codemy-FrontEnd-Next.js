import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import clsx from "clsx";
import { createItem } from "@/state/slices/activeLessonSlice";
import { findFile } from "@/utils/findFile";
import { getIcon } from "@/utils/getIcon";
import { item } from "@/types/fileTree";
import { selectedItem } from "@/types/lesson";
import styles from './NewItem.module.scss';
import { useAppDispatch } from "@/state/hooks";

interface NewItemProps {
    fileTree: item[], 
    setIsCreated: Dispatch<SetStateAction<boolean>>, 
    itemType: 'file' | 'folder', 
    selectedItem: selectedItem
}

const NewItem = ({fileTree, setIsCreated, itemType, selectedItem}: NewItemProps) => {
    const dispatch = useAppDispatch();

    const [icon, setIcon] = useState(getIcon("unknown"));
    const [fileName, setFileName] = useState("");
    const wrapperRef = useRef<HTMLLIElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const createNewItem = useCallback(() => {
        const title = inputRef.current?.value.trim();
        let { path: parentPath, type: parentType } = selectedItem;

        if(parentType === "file") {
            const parts = parentPath.split('/');
            parts.pop();
            parentPath = parts.join('/');
        }
        
        const path = `${parentPath}/${title}`;

        const isExisted = findFile(fileTree, path);

        if(isExisted) {
            alert(`${itemType === "file" ? "File" : "Folder"} with this name already exists.`);
            inputRef.current?.focus();
        } else if(title && (title === '.' || title.includes('/'))) {
            alert(`${itemType === "file" ? "File" : "Folder"} with "${title}" name is canceled.`);
            inputRef.current?.focus();
        } else if(title) {
            dispatch(createItem({title, parentPath, path, type: itemType}));
            
            setIsCreated(false);
        } else setIsCreated(false);
    }, [fileTree, itemType, dispatch, setIsCreated, selectedItem]);

    useEffect(() => inputRef.current?.focus(), []);
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) createNewItem();
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [createNewItem]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") createNewItem();
        else if (e.key === "Escape") setIsCreated(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFileName(value);
        
        if(itemType === "file") {
            const extension = value.includes(".") ? value.split(".").pop() ?? "unknowm" : "unknown";
            setIcon(getIcon(extension));
        }
    }
    
    return (
        <li ref={wrapperRef} className="files__tree-item" role="treeitem" aria-selected="false">
            <div className={styles.file} tabIndex={0}>
                <div className={styles.indent} style={{width: "0px"}}></div>
                <div className={styles.twistie} style={{paddingLeft: "8px"}}></div>
                
                <div className={styles.content}>
                    {itemType === "folder" ?
                        <div className={clsx(styles['folder-icon'], styles.collapsed, 'codicon', 'codicon-tree-item-expanded')}></div>
                        :
                        <div className={styles['file-icon']}><Image src={icon} alt="file" /></div>
                    }
                    <div className={styles.title}>
                        <input
                            type="text" 
                            ref={inputRef}
                            onChange={handleChange} 
                            onKeyDown={handleKeyDown}
                            value={fileName}
                            autoCorrect="off" 
                            autoCapitalize="off" 
                            spellCheck="false"  
                        />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default NewItem;