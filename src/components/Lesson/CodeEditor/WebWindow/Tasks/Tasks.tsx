import { useRef, useState } from "react";

import AddTask from "./Task/AddTask";
import CreateTaskPopUp from "@/components/PopUp/Task/CreateTaskPopUp";
import Image from "next/image";
import Resizer from "@/components/Resizer/Resizer";
import Task from "./Task/Task";
import { Task as TaskType } from "@/types/lessons";
import styles from './Tasks.module.scss';
import tasksIcon from "@/assets/images/icons/tasks.svg";
import { useAppSelector } from "@/state/hooks/hooks";
import { useTranslations } from "next-intl";

interface ITasksProps {
    tasks: TaskType[],
    isEditMode: boolean
}

const Tasks = ({ tasks, isEditMode }: ITasksProps) => {
    const t = useTranslations('Lesson');

    const testResults = useAppSelector(state => state.activeLesson.testResults);
    
    const MIN_HEIGHT = 150;
    const MAX_HEIGHT = 500;
    const tasksRef = useRef(null);
    const [tasksHeight, setTasksHeight] = useState(350);

    const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

    return (
        <div className={styles.tasks} ref={tasksRef} style={{height: `${tasksHeight}px`}}>
            <Resizer direction="top" MIN_HEIGHT={MIN_HEIGHT} MAX_HEIGHT={MAX_HEIGHT} sidebarRef={tasksRef} setSidebarHeight={setTasksHeight}/>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <Image src={tasksIcon} alt="tasks icon" />
                        {t('tasks')}
                    </h2>
                </div>

                <ol className={styles.list}>
                    {sortedTasks.map(el => {
                        const isFinished = el.isCompleted || testResults[el.id]?.success;
                        
                        return <Task key={el.id} task={el} isFinished={isFinished} isEditMode={isEditMode} />;
                    })}

                    {isEditMode && <AddTask />}
                </ol>
            </div>
        </div>
    );
}

export default Tasks;