import { MouseEvent, useState } from "react";

import ChangeTaskPopUp from "@/components/PopUp/Task/ChangeTaskPopUp";
import Image from "next/image";
import MarkdownTask from "@/components/Markdown/MarkdownTask";
import { Task as TaskType } from "@/types/lessons";
import checkIcon from "@/assets/images/icons/check.svg";
import clsx from "clsx";
import styles from './Task.module.scss';

interface ITaskProps {
    task: TaskType,
    isFinished: boolean,
    isEditMode: boolean
}

const Task = ({ task, isFinished, isEditMode }: ITaskProps) => {
    const [isPopUp, setIsPopUp] = useState(false);

    const clickChange = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsPopUp(true);
    }

    return (
        <>
            <li className={styles.task}>
                <div className={clsx(styles.checkbox, isFinished && styles.complete)}>
                    {isFinished && <Image src={checkIcon} alt="check icon" />}
                </div>

                <div className={styles['title-container']}>
                    <h3 className={styles.title}>
                        <MarkdownTask markdown={task.title} isCompleted={isFinished} />
                    </h3>

                    {isEditMode && <div className={styles['change-icon']} onClick={clickChange}>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M15.293 3.293 4.96 13.626c-.22.219-.385.488-.484.782l-1.924 5.778-.633 1.897 1.897-.633 5.777-1.927a2 2 0 00.78-.482l9.334-9.334 1-1a3.83 3.83 0 00-5.414-5.414Zm4 1.414a1.83 1.83 0 010 2.586L19 7.586 16.414 5l.293-.293a1.83 1.83 0 012.586 0ZM6.374 15.04 15 6.414 17.586 9 8.96 17.626 5.08 18.92l1.294-3.88Z"></path></svg>
                        </div>
                    }
                </div>
            </li>

            {isPopUp && <ChangeTaskPopUp setIsPopUp={setIsPopUp} task={task} />}
        </>
    );
}

export default Task;