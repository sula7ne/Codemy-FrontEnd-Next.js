import AccordionItem from "@/components/Accordion/AccordionCourse/AccordionItem/AccordionItem";
import { Section } from "@/types/courses";
import styles from "./Accordion.module.scss";

interface AccordionProps {
    sections: Section[]
}

const Accordion = ({ sections }: AccordionProps) => {
    return (
        <ul className={styles.accordion}>
            {sections.map((el, id) => (
                <AccordionItem key={el.id} section={el} isFirstChild={id === 0} isLastChild={(id+1) === sections.length} />
            ))}
        </ul>
    );
}

export default Accordion;