import { Dispatch, SetStateAction } from "react";

import { Lesson } from "@/types/lessons";
import clsx from "clsx";
import styles from './FileBarHeader.module.scss';
import { useAuth } from "@/state/hooks/useAuth";

interface FileBarHeaderProps {
    setIsCreated: Dispatch<SetStateAction<boolean>>,
    setItemType: Dispatch<SetStateAction<'FILE' | 'FOLDER'>>,
    lesson: Lesson
}

const FileBarHeader = ({ lesson, setIsCreated, setItemType }: FileBarHeaderProps) => {
    const { isAuth } = useAuth();
    
    const handleCreateFile = () => {
        if (!isAuth) {
            alert("Пожалуйста, авторизуйтесь, чтобы начать писать код!");
            return; 
        } else {
            setIsCreated(true);
            setItemType("FILE");
        }
    }

    const handleCreateFolder = () => {
        if (!isAuth) {
            alert("Пожалуйста, авторизуйтесь, чтобы начать писать код!");
            return; 
        } else {
            setIsCreated(true);
            setItemType("FOLDER");
        }
    }
    
    return (
        <header className={styles.header} tabIndex={0}>
            <h3 className={styles.title}>file explorer</h3>
            <div className={styles.btns}>
                <div className={clsx(styles.icon, 'codicon', 'codicon-new-file')} onClick={handleCreateFile} aria-label="New File" tabIndex={0}></div>
                <div className={clsx(styles.icon, 'codicon', 'codicon-new-folder')} onClick={handleCreateFolder} aria-label="New Folder" tabIndex={0}></div>
            </div>
        </header>
    );
}

export default FileBarHeader;