import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { updateSectionDto, updateSectionDtoType } from "@/schemas/sections.schema";

import { Section } from "@/types/courses";
import styles from "./../PopUp.module.scss"
import { useDeleteSectionMutation } from "@/state/api/sectionsApi";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useUpdateSectionMutation } from "@/state/api/coursesApi";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    section: Section,
    courseId: string
}

const ChangeSectionPopUp = ({ setIsPopUp, section, courseId }: PopUpProps) => {
    const t = useTranslations('PopUp');
    
    const MAX_TITLE = 50;
    const MAX_DESCRIPTION = 300;

    const [updateSection, { isLoading, isError, error }] = useUpdateSectionMutation();
     const [deleteSection] = useDeleteSectionMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<updateSectionDtoType>({
        resolver: zodResolver(updateSectionDto),
        mode: 'onChange',
        defaultValues: {
            title: section.title,
            description: section.description
        },
    });

    const watchTitle = watch("title", section.title);
    const watchDescription = watch("description", section.description);  

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

    const handleDeleteSection = async () => {
        try {
            await deleteSection({ id: section.id }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при удалении секции:", e, section);
        }
    }

    const onSubmit = async (data: updateSectionDtoType) => {
        try {
            await updateSection({ courseId, sectionId: section.id, data }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при изменении секции:", e);
        }
    }

    const serverError = error as { data?: { message?: string } } | undefined;

    return (
        <div onMouseDown={handleClose} className={styles.container}>
            <div className={styles['pop-up']}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                    <header className={styles.header}>
                        <div className={styles['header-content']}>
                            <h2>Изменение секции</h2>

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
                        <div className={styles.input} style={{borderColor: errors.description ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.description')}</div>
                            <textarea {...register('description')} rows={4} id="description" placeholder={t('fields.descriptionPlaceholder')} />
                            <div style={{color: errors.description ? '#ff8983' :'#aaa'}} className={styles.length}>{watchDescription.length}/{MAX_DESCRIPTION}</div>
                        
                            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles['footer-content']}>
                            <button type="button" className={styles.delete} onClick={handleDeleteSection}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M19 3h-4V2a1 1 0 00-1-1h-4a1 1 0 00-1 1v1H5a2 2 0 00-2 2h18a2 2 0 00-2-2ZM6 19V7H4v12a4 4 0 004 4h8a4 4 0 004-4V7h-2v12a2 2 0 01-2 2H8a2 2 0 01-2-2Zm4-11a1 1 0 00-1 1v8a1 1 0 102 0V9a1 1 0 00-1-1Zm4 0a1 1 0 00-1 1v8a1 1 0 002 0V9a1 1 0 00-1-1Z"></path></svg>
                            </button>
                            
                            <button type="submit" className={styles.create} disabled={isLoading} >{t('actions.edit')}</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default ChangeSectionPopUp;