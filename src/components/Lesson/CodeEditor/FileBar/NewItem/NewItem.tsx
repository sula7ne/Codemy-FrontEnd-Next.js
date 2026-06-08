import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { SelectedItem, createItem } from "@/state/slices/activeLessonSlice";

import { FileTreeNode } from "@/types/lessons";
import Image from "next/image";
import clsx from "clsx";
import { findFile } from "@/utils/findFile";
import { getIcon } from "@/utils/getIcon";
import styles from './NewItem.module.scss';
import { useAppDispatch } from "@/state/hooks/hooks";
import { useCreateFileMutation } from "@/state/api/lessonsApi";
import { useParams } from "next/navigation";

interface NewItemProps {
    fileTree: FileTreeNode[], 
    setIsCreated: Dispatch<SetStateAction<boolean>>, 
    itemType: 'FILE' | 'FOLDER', 
    selectedItem: SelectedItem,
    depth: number
}

const NewItem = ({ fileTree, setIsCreated, itemType, selectedItem, depth }: NewItemProps) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const lessonId = params.id as string;

    const [createFile, { isLoading }] = useCreateFileMutation();

    const [icon, setIcon] = useState(getIcon(""));
    const [fileName, setFileName] = useState("");
    const wrapperRef = useRef<HTMLLIElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isSavingRef = useRef(false);

    const createNewItem = useCallback(async () => {
        const title = inputRef.current?.value.trim();
        let { path: parentPath } = selectedItem;
        const { type: parentType } = selectedItem;

        if (!title ) {
            setIsCreated(false);
            return;
        }

        if (parentType === "FILE") {
            const parts = parentPath.split('/');
            parts.pop();
            parentPath = parts.join('/');
        }
        
        const normalizedParentPath = parentPath === "." || parentPath === "" ? "" : parentPath;
        const path = `${normalizedParentPath}/${title}`;

        const isExisted = findFile(fileTree, path);

        if (isExisted) {
            alert(`${itemType === "FILE" ? "FILE" : "FOLDER"} with this name already exists.`);
            inputRef.current?.focus();
            return;
        } 
        
        if (title === '.' || title.includes('/')) {
            alert(`${itemType === "FILE" ? "FILE" : "FOLDER"} with "${title}" name is canceled.`);
            inputRef.current?.focus();
            return;
        }

        const extension = itemType === "FILE" && title.includes(".") ? title.split(".").pop()?.toLowerCase() || "" : "";

        try {
            isSavingRef.current = true;
            
            await createFile({
                lessonId,
                body: {
                    type: itemType,
                    title,
                    path,
                    extension,
                    code: "",
                    isTab: false
                }
            }).unwrap();

            dispatch(createItem({ title, parentPath, path, type: itemType }));
            setIsCreated(false);
        } catch (error) {
            console.error(error);
            alert("Failed to save file on server. Please try again.");
            inputRef.current?.focus();
        } finally {
            isSavingRef.current = false;
        }
    }, [fileTree, itemType, dispatch, setIsCreated, selectedItem, lessonId, createFile]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node) && !isLoading && !isSavingRef.current) {
                createNewItem();
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [createNewItem, isLoading]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") createNewItem();
        else if (e.key === "Escape") setIsCreated(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFileName(value);
        
        if(itemType === "FILE") {
            const extension = value.includes(".") ? value.split(".").pop() ?? "" : "";
            setIcon(getIcon(extension));
        }
    }

    const indentPadding = itemType === "FILE" ? ((depth - 1) * 8) + 14 : (depth - 1) * 8;
    
    return (
        <li ref={wrapperRef} className="files__tree-item" role="treeitem" aria-selected="false">
            <div className={styles.file} tabIndex={0}>
                <div className={styles.contentWrapper} style={{ paddingLeft: `${indentPadding}px` }}>
                    <div className={styles.content}>
                        {itemType === "FOLDER" ?
                            <div className={clsx(styles['folder-icon'], 'codicon', 'codicon-tree-item-expanded')}></div>
                            :
                            <div className={styles['file-icon']}><Image src={icon} alt="file" width={16} height={16} /></div>
                        }
                        <div className={styles.title}>
                            <input
                                type="text" 
                                ref={inputRef}
                                onChange={handleChange} 
                                onKeyDown={handleKeyDown}
                                value={fileName}
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default NewItem;
