import AccordionItem from "@/components/Accordion/AccordionLesson/AccordionItem/AccordionItem";
import { Section } from "@/types/courses";
import styles from "./Accordion.module.scss";

interface AccordionProps {
    sections: Section[]
}

const Accordion = ({ sections }: AccordionProps) => {
    return (
        <ul className={styles.accordion}>
            {sections.map((s, id) => (
                <AccordionItem key={s.id} section={s} isFirstChild={id === 0} isLastChild={(id+1) === sections.length} />
            ))}
        </ul>
    );
}

export default Accordion;