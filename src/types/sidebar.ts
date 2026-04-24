import { ReactNode } from "react"

export type sidebar = {
    id: string,
    path: string,
    label: string,
    icon: ReactNode
    activeIcon: ReactNode
}