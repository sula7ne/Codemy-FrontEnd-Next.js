import { item } from "@/types/fileTree";

export const findFile = (fileTree: item[], path: string): item | null => {
    for(let el of fileTree) {
        if(el.path === path) return el;
        if(el.type === "folder") {
            const found = findFile(el.children, path);
            if(found) return found;
        }
    }

    return null;
}