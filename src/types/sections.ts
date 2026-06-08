type Lesson = {
    id: string;
    title: string;
    theory: string;
    order: number;
}

export type Section = {
    id: string;
    title: string;
    description: string;
    order: number;
    courseId: string;
    lessons: Lesson[];
}