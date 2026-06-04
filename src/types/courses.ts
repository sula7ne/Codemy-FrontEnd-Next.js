export type Course = {
    level: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    cover: string;
    time: string;
    language: string;
    reviewsCount: number;
    rating: number;
    authorId: string;
    author: {
        name: string;
        avatar: string;
    };
}

export type courseDetails = Course & {
    sections: Section[];
    userCourse: {
        status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
        isSaved: boolean;
    },
    completedLessonsCount: number,
    totalLessonsCount: number
};

export type Section = {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[]; // temp
}

export type Lesson = {
    id: string;
    title: string;
    theory: string;
    order: number;
    userLesson: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isCompleted: boolean;
        lessonId: string;
    }
}

export type courseWithDetails = Course & {
    sections: Section[];
    myProgress: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        userId: string;
        status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
        isSaved: boolean;
    };
    progressPercent: number;
};