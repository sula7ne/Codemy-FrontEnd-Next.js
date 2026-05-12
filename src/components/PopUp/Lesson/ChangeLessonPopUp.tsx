import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";

import { lesson } from "@/types/lesson";
import styles from "./../PopUp.module.scss";
import { useTranslations } from "next-intl";

interface PopUpProps {
    setIsPopUp: Dispatch<SetStateAction<boolean>>,
    lesson: lesson
}

const ChangeLessonPopUp = ({ setIsPopUp, lesson }: PopUpProps) => {
    const t = useTranslations('PopUp');
    
    const [title, setTitle] = useState(lesson?.title || '');
    const [theory, setTheory] = useState(lesson?.theory || '');
    const MAX_TITLE = 100;
    const MAX_THEORY = 3000;

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

    const handleSubmit = () => {
        setIsPopUp(false);


    }

    return (
        <div onMouseDown={handleClose} className={styles.container}>
            <div className={styles['pop-up']}>
                <div className={styles.content}>
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
                        <div className={styles.input} style={{borderColor: title.length >= MAX_TITLE ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.title')}</div>
                            <input required type="text" name="title" id="title" placeholder={t('fields.titlePlaceholder')} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <div style={{color: title.length >= MAX_TITLE ? '#ff8983' :'#aaa'}} className={styles.length}>{title.length}/{MAX_TITLE}</div>
                        </div>
                        <div className={styles.input} style={{borderColor: theory.length >= MAX_THEORY ? '#ff8983' :'#ffffff1a'}}>
                            <div className={styles.title}>{t('fields.theory')}</div>
                            <textarea rows={10} required name="theory" id="theory" placeholder={t('fields.theoryPlaceholder')} value={theory} onChange={(e) => setTheory(e.target.value)}/>
                            <div style={{color: theory.length >= MAX_THEORY ? '#ff8983' :'#aaa'}} className={styles.length}>{theory.length}/{MAX_THEORY}</div>
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles['footer-content']}>
                            {/* onSubmit */}
                            <button className={styles.create} onClick={handleSubmit}>{t('actions.edit')}</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default ChangeLessonPopUp;