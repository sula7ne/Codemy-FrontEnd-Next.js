import { FileTreeNode } from "@/types/lessons";

export const findFile = (fileTree: FileTreeNode[], path: string): FileTreeNode | null => {
    for (const el of fileTree) {
        if (el.path === path) return el;
        
        if (el.type === "FOLDER" && el.children) {
            const found = findFile(el.children, path);
            if (found) return found;
        }
    }

    return null;
};