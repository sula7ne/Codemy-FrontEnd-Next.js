import "@/assets/styles/globals.scss";
import "@/assets/styles/_variables.scss";
import "@vscode/codicons/dist/codicon.css";

import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';

import { Providers } from "./providers";
import { ScrollReset } from "@/components/ScrollReset";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
        <body>
            <NextIntlClientProvider>
                <Providers>
                    <ScrollReset />
                    {children}
                </Providers>
            </NextIntlClientProvider>
        </body>
        </html>
    );
}
