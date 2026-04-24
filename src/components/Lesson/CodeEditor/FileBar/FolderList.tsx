import FileItem from "@/components/Lesson/CodeEditor/FileBar/FileItem/File";
import Folder from "@/components/Lesson/CodeEditor/FileBar/Folder/Folder";
import { item } from "@/types/fileTree";

interface FolderListProps {
    fileTree: item[]
}

const FolderList = ({ fileTree }: FolderListProps) => {
    return (
        <ul className="folder-list" role="group">
            {fileTree.map((el) => (
                el.type === "file" ? 
                    <FileItem key={el.path} title={el.title} extension={el.extension} path={el.path} isFolder={true} />
                :
                    <Folder key={el.path} title={el.title} children={el.children} path={el.path} />
            ))}
        </ul>
    );
}

export default FolderList;