import { Section } from "./courses";

export type UserLesson = {
    id: string;
    lessonId: string;
    userId: string;
    isCompleted: boolean;
};

export type Test = {
    type: 'dom-query' | 'js-function';
    selector?: string;
    property?: string;
    expectedValue?: string;
    code?: string;  
};

export type File =  {
    id: string;
    type: 'FILE' | 'FOLDER'
    path: string;
    code: string | null;
    title: string;
    lessonId: string;
    extension: string | null;
    isTab: boolean | null;
};

export type CreateFile = {
    type: "FILE" | "FOLDER";
    title: string;
    path: string;
    extension?: string | undefined;
    code?: string | undefined;
    isTab?: boolean | undefined;
}

export type CreateUserFile = CreateFile & {
    fileId: string
}

export interface FileTreeNode {
    type: 'FILE' | 'FOLDER';
    title: string;
    path: string;
    extension?: string | null;
    code?: string | null;
    children?: FileTreeNode[]; 
}

export type Task = {
    id: string;
    title: string;
    test: Test,
    order: number;
    lessonId: string;
    isCompleted: boolean;
};

export type Lesson = {
    id: string;
    title: string;
    theory: string;
    order: number;
    sectionId: string;
    
    files: File[];
    tasks: Task[];

    isCompleted?: boolean;
}

export type LessonWithDetails = {
    section: {
        id: string,
        title: string,
        description: string,
        order: number,
        courseId: string,
        course: {
            id: string,
            sections: Section[]
        }
    }
} & Lesson;
