"use client"

import { loginDto, loginDtoType } from "@/schemas/auth.schema";

import Link from "next/link";
import clsx from "clsx";
import styles from './../auth.module.scss';
import { useAppDispatch } from "@/state/hooks";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
    const t = useTranslations('Auth');
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<loginDtoType>({
        resolver: zodResolver(loginDto),
        mode: 'onSubmit',
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (data: loginDtoType) => {
        try {
            reset();

            
        } catch(e) { console.log(e); }
    };
    
    return (
        <div className={styles['auth-form']}>
            <h2 className={styles.title}>{t('login.title')}</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['form-el']}>
                    <label htmlFor="email">{t('fields.email')}</label>
                    <input
                        id="email"
                        type="text"
                        placeholder={t('fields.emailPlaceholder')}
                        {...register("email")}
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div className={styles['form-el']}>
                    <label htmlFor="password">{t('fields.password')}</label>
                    <input
                        id="password"
                        type="password"
                        placeholder={t('fields.passwordPlaceholder')}
                        {...register("password")}
                    />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>

                <button
                    className={styles.submit} 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {t('login.submit')}
                </button>
            </form>
            <p className={styles.redirect}>
                {t.rich('login.redirect', {
                    link: (chunks) => <Link href="/auth/register">{chunks}</Link>
                })}
            </p>
        </div>
    );
}

export default Login;