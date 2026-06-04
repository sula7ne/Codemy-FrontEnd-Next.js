"use client"

import { registerDto, registerDtoType } from "@/schemas/auth.schema";

import Link from "next/link";
import styles from './../auth.module.scss';
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/state/api/authApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
    const t = useTranslations('Auth');
    const router = useRouter();
    const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

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
            name: "",
            password: ""
        },
    });

    const onSubmit = async (data: registerDtoType) => {
        try {
            const result = await registerUser(data).unwrap();

            reset();

            router.push('/courses'); 
        } catch(e) { console.log(e); }
    };
    
    const serverError = error as { data?: { message?: string } } | undefined

    return (
        <div className={styles['auth-form']}>
            <h2 className={styles.title}>{t('register.title')}</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {isError && <div className={styles.error}>{serverError?.data?.message}</div>}

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
                    <label htmlFor="name">{t('fields.name')}</label>
                    <input
                        id="name"
                        type="text"
                        placeholder={t('fields.namePlaceholder')}
                        {...register("name")}
                    />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
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
                    disabled={isLoading}
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