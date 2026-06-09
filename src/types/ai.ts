export type AIMessage = {
    role: "USER" | "MODEL";
    text: string;
    createdAt?: string;
}

export type AIResponse = {
    role: "MODEL";
    text?: string;
    parts?: {
        text?: string;
    }[];
}

export type AIHistoryResponse = {
    contents: {
        role: string;
        parts?: {
            text?: string;
        }[];
    }[];
}

export type AISendMessagePayload =  {
    message: string;
    lessonId: string
}
