export type social = {
    type: string,
    url: string
}

export type author = {
    id: string,
    name: string,
    avatar: string,
    headline: string,
    bio: string,
    socials: social[],
    courses: string[],
}