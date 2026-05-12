import AccordionItem from "@/components/Accordion/AccordionCourse/AccordionItem/AccordionItem";
import styles from "./Accordion.module.scss";

interface AccordionProps {
    sections: string[]
}

const Accordion = ({ sections }: AccordionProps) => {
    return (
        <ul className={styles.accordion}>
            {sections.map((sectionId, id) => (
                <AccordionItem key={sectionId} sectionId={sectionId} isFirstChild={id === 0} isLastChild={(id+1) === sections.length} />
            ))}
        </ul>
    );
}

export default Accordion;