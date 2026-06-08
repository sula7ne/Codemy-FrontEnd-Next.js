import { useRef, useState } from "react";

import FileBarHeader from "./FileBarHeader/FileBarHeader";
import FileBarTree from "./FileTree/FileBarTree";
import { Lesson } from "@/types/lessons";
import Resizer from "@/components/Resizer/Resizer";
import styles from "./Filebar.module.scss";

interface IFileBarProps {
    lesson: Lesson
}

const FileBar = ({ lesson }: IFileBarProps) => {
    const [isCreated, setIsCreated] = useState(false);
    const [itemType, setItemType] = useState<'FILE' | 'FOLDER'>("FILE");

    const MIN_WIDTH = 155;
    const MAX_WIDTH = 350;
    const filebarRef = useRef(null);
    const [filebarWidth, setFilebarWidth] = useState(180);
    
    return (
        <div className={styles.filebar} role="tree" aria-label="File Explorer">
            <div ref={filebarRef} className={styles.files} style={{width: `${filebarWidth}px`}}>
                <FileBarHeader lesson={lesson} setIsCreated={setIsCreated} setItemType={setItemType} />

                <FileBarTree lesson={lesson} setIsCreated={setIsCreated} isCreated={isCreated} itemType={itemType} />                
            </div>

            <Resizer direction="right" MIN_WIDTH={MIN_WIDTH} MAX_WIDTH={MAX_WIDTH} sidebarRef={filebarRef} setSidebarWidth={setFilebarWidth}/>
        </div>
    );
}

export default FileBar;