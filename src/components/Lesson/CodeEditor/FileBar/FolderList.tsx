import FileItem from "@/components/Lesson/CodeEditor/FileBar/FileItem/File";
import { FileTreeNode } from "@/types/lessons";
import Folder from "@/components/Lesson/CodeEditor/FileBar/Folder/Folder";

interface FolderListProps {
    fileTree: FileTreeNode[],
    depth: number
}

const FolderList = ({ fileTree, depth }: FolderListProps) => {
    return (
        <ul className="folder-list" role="group">
            {fileTree.map((el) => (
                el.type === "FILE" ? 
                    <FileItem key={el.path} title={el.title} extension={el.extension || 'unknown'} path={el.path} isFolder={true} depth={depth} />
                :
                    <Folder key={el.path} title={el.title} fileTree={el.children || []} path={el.path} depth={depth} />
            ))}
        </ul>
    );
}

export default FolderList;