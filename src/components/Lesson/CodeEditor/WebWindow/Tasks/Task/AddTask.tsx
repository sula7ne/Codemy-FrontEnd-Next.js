import clsx from "clsx";
import styles from './Task.module.scss';

const AddTask = () => {
    const handleClick = () => {
        
    }

    return (
        <li className={clsx(styles.task, styles.add)}>
            <div className={styles.icon}>
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path></svg>
            </div>
            
            <div className={styles.title} onClick={handleClick}>
                Добавить задание
            </div>
        </li>
    );
}

export default AddTask;