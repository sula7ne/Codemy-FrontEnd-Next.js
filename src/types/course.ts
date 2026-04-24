export type course = {
    id: string,
    title: string,
    description: string,
    authorId: string,
    cover: string,
    time: string,
    level: string,
    lessonsCount: number,
    studentsCount: number,
    rating: string,
    ratingsCount: number,
    createdAt: number,
    language: string, // в будущем массив, когда добавлю озвучки[]
    lessons: string[], // sections
    sections: string[]
}

export type userCourse = {
    courseId: string,
    progress: number,
    lastLessonId: string
}