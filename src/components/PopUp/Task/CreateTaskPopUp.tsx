import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { createTaskDto, createTaskDtoType } from "@/schemas/tasks.schema";

import styles from "./../PopUp.module.scss";
import { useCreateTaskMutation } from "@/state/api/lessonsApi";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>
}

const CreateTaskPopUp = ({ setIsPopUp }: PopUpProps) => {
    const t = useTranslations('PopUp');
    const params = useParams();
    const lessonId = params.id as string;
    
    const MAX_TITLE = 50;
    const MAX_CODE = 200;

    const [createTask, { isLoading, isError, error }] = useCreateTaskMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<createTaskDtoType>({
        resolver: zodResolver(createTaskDto),
        mode: 'onChange',
        defaultValues: {
            title: "",
            test: {
                type: "dom-query",
                expectedValue: "",
                property: "",
                selector: "",
                code: ""
            }
        },
    });

    const watchTitle = watch("title", "");
    const watchType = watch("test.type");
    const watchCode = watch("test.code", "");

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

    const onSubmit = async (data: createTaskDtoType) => {
        try {
            await createTask({ lessonId, body: data }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при создании задания:", e);
        }
    }

    const serverError = error as { data?: { message?: string } } | undefined;

    return (
        <div onMouseDown={handleClose} className={styles.container}>
            <div className={styles['pop-up']}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                    <header className={styles.header}>
                        <div className={styles['header-content']}>
                            <h2>Добавление задания</h2>

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
                        
                        <div className={styles.input}>
                            <div className={styles.title}>Тип задания</div>
                            
                            <select {...register("test.type")} id="type" required>
                                <option value="dom-query">dom-query</option>
                                <option value="js-function">js-function</option>
                            </select>

                            {errors.test?.type && <p className={styles.error}>{errors.test?.type.message}</p>}
                        </div>

                        {watchType === "dom-query" && (
                            <>
                                <div className={styles.input}>
                                    <div className={styles.title}>Селектор</div>
                                    <input {...register("test.selector")} type="text" id="selector" placeholder="h1" />

                                    {errors.test?.selector && <p className={styles.error}>{errors.test?.selector.message}</p>}
                                </div>
                                <div className={styles.input}>
                                    <div className={styles.title}>Свойство</div>
                                    <input {...register("test.property")} type="text" id="property" placeholder="color" />

                                    {errors.test?.property && <p className={styles.error}>{errors.test?.property.message}</p>}
                                </div>
                                <div className={styles.input}>
                                    <div className={styles.title}>Ожидаемое значение</div>
                                    <input {...register("test.expectedValue")} type="text" id="expectedValue" placeholder="rgb(255, 0, 0)" />

                                    {errors.test?.expectedValue && <p className={styles.error}>{errors.test?.expectedValue.message}</p>}
                                </div>
                            </>
                        )}

                        {watchType === "js-function" && (
                            <div className={styles.input}>
                                <div className={styles.title}>Код проверки (JS)</div>
                                <textarea {...register("test.code")} id="code" rows={5} placeholder="const h1 = document.querySelector('h1'); return h1 && h1.parentElement.classList.contains('header');" />
                                <div className={styles.length}>{watchCode.length}/{MAX_CODE}</div>
                                
                                {errors.test?.code && <p className={styles.error}>{errors.test?.code.message}</p>}
                            </div>
                        )}
                        
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles['footer-content']}>
                            <button type="submit" className={styles.create} disabled={isLoading}>Добавить</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default CreateTaskPopUp;