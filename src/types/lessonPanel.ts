import { ReactNode } from "react"

export type lessonPanelId = "theory" | "ai-chatbot";

export type lessonPanel = {
    id: lessonPanelId,
    label: string,
    icon: ReactNode
}