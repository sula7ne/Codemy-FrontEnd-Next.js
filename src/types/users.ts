import { Course } from "@/types/courses"

export type User = {
    id: string,
    email: string,
    name: string,
    avatar: string,
    type: "USER" | "ADMIN",
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,

    headline: string,
    bio: string,
    courses: Course[]
}