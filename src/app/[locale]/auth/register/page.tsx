"use client"

import { registerDto, registerDtoType } from "@/schemas/auth.schema";

import Link from "next/link";
import clsx from "clsx";
import styles from './../auth.module.scss';
import { useAppDispatch } from "@/state/hooks";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
    const t = useTranslations('Auth');
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<registerDtoType>({
        resolver: zodResolver(registerDto),
        mode: 'onSubmit',
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    });

    const onSubmit = async (data: registerDtoType) => {
        try {
            reset();

            
        } catch(e) { console.log(e); }
    };
    
    return (
        <div className={styles['auth-form']}>
            <h2 className={styles.title}>{t('register.title')}</h2>

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
                    <label htmlFor="username">{t('fields.username')}</label>
                    <input
                        id="username"
                        type="text"
                        placeholder={t('fields.usernamePlaceholder')}
                        {...register("username")}
                    />
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
                    {t('register.submit')}
                </button>
            </form>

            <p className={styles.redirect}>
                {t.rich('register.redirect', {
                    link: (chunks) => <Link href="/auth/register">{chunks}</Link>
                })}
            </p>
        </div>
    );
}

export default Register;