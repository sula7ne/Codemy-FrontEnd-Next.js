import { useRef, useState } from "react";

import Image from "next/image";
import MarkdownTask from "@/components/Markdown/MarkdownTask";
import Resizer from "@/components/Resizer/Resizer";
import checkIcon from "@/assets/images/icons/check.svg";
import clsx from "clsx";
import styles from './Tasks.module.scss';
import tasksIcon from "@/assets/images/icons/tasks.svg";
import { useAppSelector } from "@/state/hooks";

const Tasks = () => {
    const tasks = useAppSelector(state => state.activeLesson.tasks);
    
    const MIN_HEIGHT = 150;
    const MAX_HEIGHT = 500;
    const tasksRef = useRef(null);
    const [tasksHeight, setTasksHeight] = useState(350);

    return (
        <div className={styles.tasks} ref={tasksRef} style={{height: `${tasksHeight}px`}}>
            <Resizer direction="top" MIN_HEIGHT={MIN_HEIGHT} MAX_HEIGHT={MAX_HEIGHT} sidebarRef={tasksRef} setSidebarHeight={setTasksHeight}/>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <Image src={tasksIcon} alt="tasks icon" />
                        Задачи
                    </h2>
                </div>

                <ol className={styles.list}>
                    {tasks.map(el => (
                        <li key={el.id} className={styles.item}>
                            <div className={clsx(styles.checkbox, el.isCompleted && styles.complete)}>
                                {el.isCompleted && <Image src={checkIcon} alt="check icon" />}
                            </div>
                            
                            <div className={styles.title}>
                                <MarkdownTask markdown={el.title} isCompleated={el.isCompleted} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Tasks;