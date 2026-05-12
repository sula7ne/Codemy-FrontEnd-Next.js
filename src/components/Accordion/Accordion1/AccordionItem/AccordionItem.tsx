import AccordionLessonsList from "@/components/Accordion/Accordion1/AccordionLessonsList/AccordionLessonsList";
import Image from "next/image";
import accordionIcon from "@/assets/images/icons/accordion.svg";
import clsx from "clsx";
import { sections } from "@/data/sections";
import styles from "./AccordionItem.module.scss";
import { useState } from "react";

interface AccordionItemProps {
    sectionId: string
}

const AccordionItem = ({ sectionId }: AccordionItemProps) => {
    const [isActive, setIsActive] = useState(false);

    const section = sections.find(el => el.id === sectionId);
    if(!section) return null;

    const handleOnClick = () => {
        setIsActive(prev => !prev);
    }

    return (
        <li className={styles.item}>
            <button onClick={handleOnClick} className={styles.open}>
                <h3 className={styles.title}>{section.title}</h3>

                <div className={clsx(styles.icon, isActive && styles.active)}>
                    <Image src={accordionIcon} alt="accordion icon" />
                </div>
            </button>

            {/* {isActive && <div className={styles.panel}>
                <p className={styles.description}>{section.description}</p>
            </div>} */}

            <div className={clsx(styles.panel, isActive && styles.active)}>
                <p className={styles.description}>{section.description}</p>

                <AccordionLessonsList sectionId={sectionId} />
            </div>
        </li>
    );
}

export default AccordionItem;