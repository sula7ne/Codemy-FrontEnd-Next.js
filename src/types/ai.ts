export type AIMessage = {
    role: "USER" | "MODEL";
    text: string;
    createdAt?: string;
}

export type AIResponse = {
    role: "MODEL";
    text: string;
}

export type AIHistoryResponse = {
    contents: AIMessage[];
}

export type AISendMessagePayload =  {
    message: string;
}