import Image from "next/image";
import MarkdownTask from "@/components/Markdown/MarkdownTask";
import { Task as TaskType } from "@/types/lessons";
import checkIcon from "@/assets/images/icons/check.svg";
import clsx from "clsx";
import styles from './Task.module.scss';

interface ITaskProps {
    task: TaskType,
    isFinished: boolean
}

const Task = ({ task, isFinished }: ITaskProps) => {
    return (
        <li className={styles.task}>
            <div className={clsx(styles.checkbox, isFinished && styles.complete)}>
                {isFinished && <Image src={checkIcon} alt="check icon" />}
            </div>
            
            <div className={styles.title}>
                <MarkdownTask markdown={task.title} isCompleted={isFinished} />
            </div>
        </li>
    );
}

export default Task;