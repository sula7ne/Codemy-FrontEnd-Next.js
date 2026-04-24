import { Dispatch, SetStateAction } from "react";

import clsx from "clsx";
import styles from './FileBarHeader.module.scss';

interface FileBarHeaderProps {
    setIsCreated: Dispatch<SetStateAction<boolean>>,
    setItemType: Dispatch<SetStateAction<'file' | 'folder'>>
}

const FileBarHeader = ({setIsCreated, setItemType}: FileBarHeaderProps) => {
    const handleCreateFile = () => {
        setIsCreated(true);
        setItemType("file");
    }

    const handleCreateFolder = () => {
        setIsCreated(true);
        setItemType("folder");
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