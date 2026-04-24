"use client"

import Header from "@/components/Layout/Header/Header";
import { ReactNode } from "react";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import styles from "./layout.module.scss";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className={styles.layout}>
            <Header />

            <div className={styles.wrapper}>
                <Sidebar />
                
                <main className={styles.content}>
                    {children}  
                </main>      
            </div>
        </div>
    );
}

export default MainLayout;