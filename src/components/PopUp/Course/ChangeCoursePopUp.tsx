import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { updateCourseDto, updateCourseDtoType } from "@/schemas/courses.schema";

import Image from "next/image";
import { courseWithDetails } from "@/types/courses";
import styles from "./../PopUp.module.scss"
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useUpdateCourseMutation } from "@/state/api/coursesApi";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    course: courseWithDetails
}

const ChangeCoursePopUp = ({ setIsPopUp, course }: PopUpProps) => {
    const t = useTranslations('PopUp');

    const [preview, setPreview] = useState<string | null>(course.cover);
    
    const MAX_TITLE = 50;
    const MAX_DESCRIPTION = 1000;

    const [updateCourse, { isLoading, isError, error }] = useUpdateCourseMutation();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<updateCourseDtoType>({
        resolver: zodResolver(updateCourseDto),
        mode: 'onChange',
        defaultValues: {
            title: course.title,
            description: course.description,
            cover: course.cover,
            time: "10h",
            level: course.level,
            language: course.language
        },
    });

    const watchTitle = watch("title", course.title);
    const watchDescription = watch("description", course.description);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            if (preview) URL.revokeObjectURL(preview);

            setPreview(imageUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

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

    const onSubmit = async (data: updateCourseDtoType) => {
        try {
            await updateCourse({ id: course.id, data }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при изменении курса:", e);
        }
    }

    const serverError = error as { data?: { message?: string } } | undefined;

    return (
        <div onMouseDown={handleClose} className={styles.container}>
            <div className={styles['pop-up']}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                    <header className={styles.header}>
                        <div className={styles['header-content']}>
                            <h2>{t('header.changeCourse')}</h2>

                            <button onClick={() => setIsPopUp(false)} className={styles.close} aria-label={t('actions.close')} title={t('actions.close')}>
                                <div className={styles.icon}>
                                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path></svg>
                                </div>
                            </button>
                        </div>
                    </header>

                    <div className={styles.center}>
                        {isError && <div className={styles.error}>{serverError?.data?.message}</div>}
                        
                        <div className={styles['input-container']}>
                            <div className={styles.title}>{t('cover.title')}</div>
                            <p className={styles.description}>{t('cover.description')}</p>

                            <div className={styles.file}>
                                <label htmlFor="file">
                                    {preview ?
                                        <Image width={200} height={120} src={preview} alt="Preview" />
                                        :
                                        <>
                                            <div className={styles.icon}>
                                                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M20 0a1 1 0 00-1 1v2h-2a1 1 0 100 2h2v2a1 1 0 002 0V5h2a1 1 0 100-2h-2V1a1 1 0 00-1-1Zm-6 4V2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V10h-2v3.233l-2.456-1.473a3 3 0 00-3.088 0L4 18.033V4h10ZM9 6a3 3 0 100 6 3 3 0 000-6Zm0 2a1 1 0 110 2 1 1 0 010-2Zm7.515 5.475L20 15.565V20H4.61l10.875-6.525a1 1 0 011.03 0Z"></path></svg>
                                            </div>
                                            <span>{t('cover.upload')}</span>
                                        </>
                                    }
                                </label>

                                <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                        <div className={styles.input} style={{borderColor: errors.title ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.title')}</div>
                            <input {...register("title")} type="text" id="title" placeholder={t('fields.titlePlaceholder')} />
                            <div style={{color: errors.title ? '#ff8983' :'#aaa'}} className={styles.length}>{watchTitle.length}/{MAX_TITLE}</div>
                        
                            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                        </div>
                        <div className={styles.input} style={{borderColor: errors.description ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.description')}</div>
                            <textarea {...register("description")} rows={4} id="description" placeholder={t('fields.descriptionPlaceholder')} />
                            <div style={{color: errors.description ? '#ff8983' :'#aaa'}} className={styles.length}>{watchDescription.length}/{MAX_DESCRIPTION}</div>
                        
                            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                        </div>

                        <div className={styles['input-container']}>
                            <div className={styles.title}>{t('fields.additional')}</div>

                            <div className={styles.selects}>
                                <div className={styles.input}>
                                    <div className={styles.title}>{t('levels.label')}</div>
                                    
                                    <select name="level" id="level" required>
                                        <option value="" disabled hidden>{t('levels.placeholder')}</option>
                                        <option value="all">{t('levels.all')}</option>
                                        <option value="beginner">{t('levels.beginner')}</option>
                                        <option value="intermediate">{t('levels.intermediate')}</option>
                                        <option value="advanced">{t('levels.advanced')}</option>
                                    </select>

                                    {errors.level && <p className={styles.error}>{errors.level.message}</p>}
                                </div>

                                <div className={styles.input}>
                                    <div className={styles.title}>{t('languages.label')}</div>
                                    
                                    <select name="language" id="language" required>
                                        <option value="" disabled hidden>{t('languages.placeholder')}</option>
                                        <option value="ru">{t('languages.ru')}</option>
                                        <option value="kz">{t('languages.kz')}</option>
                                        <option value="en">{t('languages.en')}</option>
                                    </select>

                                    {errors.language && <p className={styles.error}>{errors.language.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles['footer-content']}>
                            {/* onSubmit */}
                            <button type="submit" className={styles.create} disabled={isLoading}>{t('actions.edit')}</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default ChangeCoursePopUp;