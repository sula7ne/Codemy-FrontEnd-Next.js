import AccordionItem from "@/components/Accordion/AccordionItem/AccordionItem";
import styles from "./Accordion.module.scss";

interface AccordionProps {
    sections: string[]
}

const Accordion = ({ sections }: AccordionProps) => {
    return (
        <ul className={styles.accordion}>
            {sections.map((sectionId) => (
                <AccordionItem key={sectionId} sectionId={sectionId} />
            ))}
        </ul>
    );
}

export default Accordion;