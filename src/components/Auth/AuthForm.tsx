"use client"

import { loginDto, loginDtoType, registerDtoType } from "@/schemas/auth.schema";

import clsx from "clsx";
import styles from './AuthForm.module.scss';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<loginDtoType>({
        resolver: zodResolver(loginDto),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    
    return (
        <div className={styles['auth-form']}>
            <h2 className={styles.title}>Form</h2>

            <form>
                
            </form>
        </div>
    );
}

export default AuthForm;