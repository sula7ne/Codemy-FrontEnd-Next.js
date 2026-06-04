"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/state/store";
import { useCheckAuthQuery } from '@/state/api/authApi';

interface ProvidersProps {
    children: React.ReactNode;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { isLoading } = useCheckAuthQuery();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#1a1a1a] text-white">
                <div className="text-xl font-semibold tracking-wider animate-pulse">
                    Интеллектуальная платформа EdTech...
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={true}
                disableTransitionOnChange
            >
                <AuthInitializer>
                    {children}
                </AuthInitializer>
            </ThemeProvider>
        </Provider>
    );
}