import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { createTaskDto, createTaskDtoType } from "@/schemas/tasks.schema";
import { useDeleteTaskMutation, useEditTaskMutation } from "@/state/api/lessonsApi";

import { Task } from "@/types/lessons";
import styles from "./../PopUp.module.scss";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    task: Task
}

const ChangeTaskPopUp = ({ setIsPopUp, task }: PopUpProps) => {
    const t = useTranslations('PopUp');
    const params = useParams();
    const lessonId = params.id as string;
    
    const MAX_TITLE = 50;
    const MAX_CODE = 200;

    const { title, test } = task;

    const [editTask, { isLoading, isError, error }] = useEditTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

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
            title,
            test: {
                type: test.type,
                expectedValue: test.expectedValue,
                property: test.property,
                selector: test.selector,
                code: test.code
            }
        },
    });

    const watchTitle = watch("title", task.title);
    const watchType = watch("test.type");
    const watchCode = watch("test.code", test.code);

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

    const handleDeleteTask = async () => {
        try {
            await deleteTask({ lessonId, taskId: task.id }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при удалении задания:", e, task);
        }
    }

    const onSubmit = async (data: createTaskDtoType) => {
        try {
            await editTask({ lessonId, taskId: task.id, body: data }).unwrap();

            setIsPopUp(false);
        } catch (e) {
            console.error("Ошибка при создании задания:", e, task, data);
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
                            <button type="button" className={styles.delete} onClick={handleDeleteTask}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M19 3h-4V2a1 1 0 00-1-1h-4a1 1 0 00-1 1v1H5a2 2 0 00-2 2h18a2 2 0 00-2-2ZM6 19V7H4v12a4 4 0 004 4h8a4 4 0 004-4V7h-2v12a2 2 0 01-2 2H8a2 2 0 01-2-2Zm4-11a1 1 0 00-1 1v8a1 1 0 102 0V9a1 1 0 00-1-1Zm4 0a1 1 0 00-1 1v8a1 1 0 002 0V9a1 1 0 00-1-1Z"></path></svg>
                            </button>
                                                        
                            <button type="submit" className={styles.create} disabled={isLoading}>Изменить</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default ChangeTaskPopUp;