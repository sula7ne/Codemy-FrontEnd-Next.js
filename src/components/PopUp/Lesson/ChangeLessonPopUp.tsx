import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { updateLessonDto, updateLessonDtoType } from "@/schemas/lessons.schema";

import { Lesson } from "@/types/courses";
import styles from "./../PopUp.module.scss";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUpdateLessonMutation } from "@/state/api/sectionsApi";
import { zodResolver } from "@hookform/resolvers/zod";

;

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    lesson: Lesson
    sectionId: string,
}

const ChangeLessonPopUp = ({ setIsPopUp, lesson, sectionId }: PopUpProps) => {
    const t = useTranslations('PopUp');
    const router = useRouter();
    
    const MAX_TITLE = 50;
    const MAX_THEORY = 5000;

    const [updateLesson, { isLoading, isError, error }] = useUpdateLessonMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<updateLessonDtoType>({
        resolver: zodResolver(updateLessonDto),
        mode: 'onChange',
        defaultValues: {
            title: lesson.title,
            theory: lesson.theory
        },
    });

    const watchTitle = watch("title", lesson.title);
    const watchTheory = watch("theory", lesson.theory);

    const handleClose = (e: MouseEvent<HTMLDivElement> ) => {
        if (e.target === e.currentTarget) {
            setIsPopUp(false);
        }
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsPopUp(false);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [setIsPopUp]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const onSubmit = async (data: updateLessonDtoType) => {
        try {
            const updatedLesson = await updateLesson({ sectionId, lessonId: lesson.id, data }).unwrap();

            setIsPopUp(false);

            router.push(`/lessons/${updatedLesson.id}/create`);
        } catch (e) {
            console.error("Ошибка при создании урока:", e);
        }
    }

    const serverError = error as { data?: { message?: string } } | undefined;

    return (
        <div onMouseDown={handleClose} className={styles.container}>
            <div className={styles['pop-up']}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                    <header className={styles.header}>
                        <div className={styles['header-content']}>
                            <h2>Изменение урока</h2>

                            <button onClick={() => setIsPopUp(false)} className={styles.close} aria-label={t('actions.close')} title={t('actions.close')}>
                                <div className={styles.icon}>
                                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path></svg>
                                </div>
                            </button>
                        </div>
                    </header>

                    <div className={styles.center}>
                        {isError && <div className={styles.error}>{serverError?.data?.message}</div>}

                        <div className={styles.input} style={{borderColor: errors.title ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.title')}</div>
                            <input {...register('title')} type="text" id="title" placeholder={t('fields.titlePlaceholder')} />
                            <div style={{color: errors.title ? '#ff8983' :'#aaa'}} className={styles.length}>{watchTitle.length}/{MAX_TITLE}</div>
                        
                            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                        </div>
                        <div className={styles.input} style={{borderColor: errors.theory ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.theory')}</div>
                            <textarea {...register('theory')} rows={10} id="theory" placeholder={t('fields.theoryPlaceholder')} />
                            <div style={{color: errors.theory ? '#ff8983' :'#aaa'}} className={styles.length}>{watchTheory.length}/{MAX_THEORY}</div>
                        
                            {errors.theory && <p className={styles.error}>{errors.theory.message}</p>}
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles['footer-content']}>
                            <button type="submit" className={styles.create} disabled={isLoading}>Далее</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default ChangeLessonPopUp;