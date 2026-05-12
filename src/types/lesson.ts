import { item } from "./fileTree"

export type task = {
    id: number,
    title: string,
    isCompleted: boolean,
}

export type tab = {
    title: string,
    extension: string,
    path: string
}

export type selectedItem = {
    type: string,
    path: string
}

export type lesson = {
    id: string,
    isCompleted: boolean,
    sectionId: string | null,
    title: string,
    order: number | null,
    theory: string,
    tasks: task[],
    fileTree: item[],
    tabs: tab[],
    activeTab: string,
    selectedItem: selectedItem,
    compiledCode: string,
    filePath: string,
    status: ''
}