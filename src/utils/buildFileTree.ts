import { File, FileTreeNode } from "@/types/lessons";

export const buildFileTree = (flatFiles: File[]): FileTreeNode[] => {
    const root: FileTreeNode[] = [];

    flatFiles.forEach((file) => {
        const parts = file.path.split("/").filter(Boolean);
        let currentLevel = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            const currentPath = "/" + parts.slice(0, index + 1).join("/");

            let existingNode = currentLevel.find((node) => node.path === currentPath);

            if (!existingNode) {
                if (isLast && file.type === "FILE") {
                    existingNode = {
                        id: file.id,
                        type: "FILE",
                        title: file.title,
                        path: file.path,
                        extension: file.extension || "unknown",
                        code: file.code || "",
                    };
                } else {
                    existingNode = {
                        id: file.id,
                        type: "FOLDER",
                        title: part,
                        path: currentPath,
                        children: [],
                    };
                }
                currentLevel.push(existingNode);
            }

            if (!isLast && existingNode.type === "FOLDER" && existingNode.children) {
                currentLevel = existingNode.children;
            }
        });
    });

    return root;
};