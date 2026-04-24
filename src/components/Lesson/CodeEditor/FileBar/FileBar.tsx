import { useRef, useState } from "react";

import FileBarHeader from "./FileBarHeader/FileBarHeader";
import FileBarTree from "./FileTree/FileBarTree";
import Resizer from "@/components/Resizer/Resizer";
import styles from "./Filebar.module.scss";

const FileBar = () => {
    const [isCreated, setIsCreated] = useState(false);
    const [itemType, setItemType] = useState<'file' | 'folder'>("file");

    const MIN_WIDTH = 155;
    const MAX_WIDTH = 350;
    const filebarRef = useRef(null);
    const [filebarWidth, setFilebarWidth] = useState(180);
    
    return (
        <div className={styles.filebar} role="tree" aria-label="File Explorer">
            <div ref={filebarRef} className={styles.files} style={{width: `${filebarWidth}px`}}>
                <FileBarHeader setIsCreated={setIsCreated} setItemType={setItemType} />

                <FileBarTree setIsCreated={setIsCreated} isCreated={isCreated} itemType={itemType} />                
            </div>

            <Resizer direction="right" MIN_WIDTH={MIN_WIDTH} MAX_WIDTH={MAX_WIDTH} sidebarRef={filebarRef} setSidebarWidth={setFilebarWidth}/>
        </div>
    );
}

export default FileBar;