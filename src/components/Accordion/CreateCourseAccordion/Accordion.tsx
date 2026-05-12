import AccordionItem from "@/components/Accordion/CreateCourseAccordion/AccordionItem/AccordionItem";
import CreateSectionPopUp from "@/components/PopUp/Section/CreateSectionPopUp";
import clsx from "clsx";
import styles from "./Accordion.module.scss";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface AccordionProps {
    sections: string[]
}

const Accordion = ({ sections }: AccordionProps) => {
    const t = useTranslations('Accordion');
    const [isPopUp, setIsPopUp] = useState(false);

    const handleOnClick = () => {
        setIsPopUp(true);
    }

    return (
        <>
            <ul className={styles.accordion}>
                {sections.map((sectionId, id) => (
                    <AccordionItem key={sectionId} sectionId={sectionId} isFirstChild={id === 0} />
                ))}

                <li className={clsx(styles.item, styles.create)} onClick={handleOnClick}>
                    <div className={styles.icon}>  
                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path></svg>
                    </div>

                    <h3 className={styles.title}>{t('AddSection')}</h3>
                </li> 
            </ul>

            {isPopUp && <CreateSectionPopUp setIsPopUp={setIsPopUp} />}
        </>
    );
}

export default Accordion;