import AccordionLessonsList from "@/components/Accordion/CreateCourseAccordion/AccordionLessonsList/AccordionLessonsList";
import clsx from "clsx";
import { sections } from "@/data/sections";
import styles from "./AccordionItem.module.scss";
import { MouseEvent, useState } from "react";
import { useAppSelector } from "@/state/hooks";
import ChangeSectionPopUp from "@/components/PopUp/Section/ChangeSectionPopUp";

interface AccordionItemProps {
    sectionId: string,
    isFirstChild: boolean
}

const AccordionItem = ({ sectionId, isFirstChild }: AccordionItemProps) => {
    const [isActive, setIsActive] = useState(isFirstChild);
    const [isPopUp, setIsPopUp] = useState(false);

    const section = sections.find(el => el.id === sectionId);
    if(!section) return null;

    const handleOnClick = () => {
        setIsActive(prev => !prev);
    }

    const clickChange = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsPopUp(true);
    }

    return (
        <>
            <li className={styles.item}>
                <button className={styles.open} onClick={handleOnClick}>
                    <div className={clsx(styles.icon, isActive && styles.active)}>
                        <svg viewBox="0 0 256 256" width={16} height={16}><polyline points="96 48 176 128 96 208" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></polyline></svg>
                    </div>

                    <div className={styles['title-container']}>
                        <h3 className={styles.title}>{section.title}</h3>

                        <div className={styles['change-icon']} onClick={clickChange}>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M15.293 3.293 4.96 13.626c-.22.219-.385.488-.484.782l-1.924 5.778-.633 1.897 1.897-.633 5.777-1.927a2 2 0 00.78-.482l9.334-9.334 1-1a3.83 3.83 0 00-5.414-5.414Zm4 1.414a1.83 1.83 0 010 2.586L19 7.586 16.414 5l.293-.293a1.83 1.83 0 012.586 0ZM6.374 15.04 15 6.414 17.586 9 8.96 17.626 5.08 18.92l1.294-3.88Z"></path></svg>
                        </div>
                    </div>
                </button>

                <div className={clsx(styles.panel, isActive && styles.active)}>
                    <div className={styles.description}>
                        <div className={styles.line}></div>
                        <p className={styles.text}>{section.description}</p>
                    </div>

                    <div className={styles.list}>
                        <div className={styles.lines}>
                            <div className={styles['line-a']}></div>
                            <div className={styles['line-b']}></div>
                        </div>

                        <AccordionLessonsList sectionId={sectionId} />

                        <div className={styles.lines}>
                            <div className={styles['line-c']}></div>
                            <div className={styles['line-d']}></div>
                        </div>
                    </div>
                </div>

                {!isActive && <div className={styles.line}></div>}
            </li>

            {isPopUp && <ChangeSectionPopUp setIsPopUp={setIsPopUp} section={section} />}
        </>
    );
}

export default AccordionItem;