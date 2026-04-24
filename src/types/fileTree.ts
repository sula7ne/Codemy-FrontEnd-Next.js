export type newItem = {
    title: string; 
    path: string;
    type: 'file' | 'folder';
    parentPath: string; 
}

export type fileItem = {
    type: 'file';
    title: string;
    path: string;
    extension: string;
    code: string;
};

export type folderItem = {
    type: 'folder';
    title: string;
    path: string;
    children: item[];
};

export type item = fileItem | folderItem;

export type fileTree = item[];