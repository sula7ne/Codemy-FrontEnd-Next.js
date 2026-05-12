"use client"

import Header from "@/components/Layout/Header/Header";
import LessonHeader from "@/components/Layout/Header/LessonHeader";
import { ReactNode } from "react";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import styles from "./layout.module.scss";
import { usePathname } from "@/i18n/navigation";
import Footer from "@/components/Layout/Footer/Footer";
import clsx from "clsx";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const pathname = usePathname();
    const isLessonPage = pathname.startsWith('/lessons/');
    
    return (
        <div className={clsx(styles.layout, isLessonPage && styles.lessonMode)}>
            {isLessonPage ? <LessonHeader /> : <Header />}

            <div className={styles.wrapper}>
                <Sidebar />
                
                <main className={styles.content}>
                    {children}  
                </main>      
            </div>

            {!isLessonPage && <Footer />}
        </div>
    );
}

export default MainLayout;