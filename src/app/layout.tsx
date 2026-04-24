import "@/assets/styles/globals.scss";

import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import { ScrollReset } from "@/components/ScrollReset";

export const metadata: Metadata = {
    title: "Codemy",
    description: "Codemy - free education for everyone",
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
            <Providers>
                <ScrollReset />
                {children}
            </Providers>
        </body>
        </html>
    );
}
