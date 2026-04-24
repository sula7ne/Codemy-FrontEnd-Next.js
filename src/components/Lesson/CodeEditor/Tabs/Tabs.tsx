import Tab from "./Tab/Tab";
import styles from './Tabs.module.scss';
import { useAppSelector } from '@/state/hooks';

const Tabs = () => {
    const tabs = useAppSelector(state => state.activeLesson.tabs);

    return (
        <div className={styles.tabs} role="tablist">
            {tabs.map((el) => (
                <Tab key={el.path} title={el.title} extension={el.extension} path={el.path} />
            ))}
        </div>
    );
}

export default Tabs;