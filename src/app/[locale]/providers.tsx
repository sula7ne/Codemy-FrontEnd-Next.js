"use client";

import { Provider } from "react-redux";
import { store } from "@/state/store";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
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
                {children}
            </ThemeProvider>
        </Provider>
    );
}