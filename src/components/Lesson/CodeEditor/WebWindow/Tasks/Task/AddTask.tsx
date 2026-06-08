import CreateTaskPopUp from "@/components/PopUp/Task/CreateTaskPopUp";
import clsx from "clsx";
import styles from './Task.module.scss';
import { useState } from "react";

const AddTask = () => {
    const [isPopUp, setIsPopUp] = useState(false);

    const handleClick = () => {
        setIsPopUp(true);
    }

    return (
        <>
            <li className={clsx(styles.task, styles.add)} onClick={handleClick}>
                <div className={styles.icon}>
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path></svg>
                </div>
                
                <div className={styles.title} onClick={handleClick}>
                    Добавить задание
                </div>
            </li>

            {isPopUp && <CreateTaskPopUp setIsPopUp={setIsPopUp} />}
        </>
    );
}

export default AddTask;