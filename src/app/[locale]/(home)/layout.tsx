"use client"

import Footer from "@/components/Layout/Footer/Footer";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import HomeHeader from "@/components/Layout/Header/HomeHeader";
import HomeSidebar from "@/components/Layout/Sidebar/HomeSidebar";

interface HomeLayoutProps {
    children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    
    return (
        <div className={styles.layout}>
            <HomeHeader />
                
            <div className={styles.wrapper}>
                <HomeSidebar />

                <main className={styles.content}>
                    {children}  
                </main>  
            </div>

            <Footer />
        </div>
    );
}

export default HomeLayout;