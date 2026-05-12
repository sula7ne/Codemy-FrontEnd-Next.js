import styles from "./ProgressBar.module.scss";
import { useTranslations } from "next-intl";
import ProgressBarOnly from "./ProgressBarOnly/ProgressBarOnly";

interface ProgressBarProps {
    percent: number
}

const ProgressBar = ({ percent }: ProgressBarProps) => {
    const t = useTranslations('ProgressBar');
    const color = percent === 100 ? '#FFD300' : 'var(--text-secondary)';

    return (
        <div className={styles.progress}>
            <h4 className={styles.title}>{t('title')}</h4>

            <div className={styles['progress-bar']}>
                <ProgressBarOnly percent={percent} />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} fill={color} role="img" aria-hidden="true"><mask id="TrophyFilledIcon-mask-_R_569j6lb9l6_"><path d="M22 5.5h-.684a29.2 29.2 0 00.284-3.493A1.957 1.957 0 0019.646 0H4.365a1.959 1.959 0 00-1.956 2.005 29.54 29.54 0 00.282 3.5H2a2 2 0 00-2 2V10a5.019 5.019 0 003.266 4.691 1 1 0 10.693-1.877A3.012 3.012 0 012 10V7.5h1.066c1.377 5.529 5.389 7.674 8.8 7.674 5.609 0 8.222-4.32 9.071-7.674H22V10a3.012 3.012 0 01-1.959 2.814 1 1 0 10.693 1.877A5.02 5.02 0 0024 10V7.5a2 2 0 00-2-2zM9.683 10.709a.523.523 0 01-.746-.654L9.83 8a.249.249 0 00-.054-.278L8.163 6.138a.49.49 0 01.344-.856h1.84a.249.249 0 00.227-.144l.962-2.071a.531.531 0 01.942 0l.961 2.07a.248.248 0 00.226.145h1.841a.49.49 0 01.345.856l-1.614 1.587a.252.252 0 00-.054.275l.894 2.052a.523.523 0 01-.746.654l-2.2-1.238a.249.249 0 00-.245 0zm2.18 5.965a10.55 10.55 0 01-1.561-.117.25.25 0 00-.286.254c.09 3.362-2.324 3.223-2.508 3.242A1.979 1.979 0 007.7 24h8.609a1.969 1.969 0 001.956-2 1.948 1.948 0 00-1.765-1.947c-1.517-.149-2.664-.8-2.571-3.253a.252.252 0 00-.083-.2.248.248 0 00-.2-.062 12.313 12.313 0 01-1.783.136z"></path></mask><g mask="url(#TrophyFilledIcon-mask-_R_569j6lb9l6_)"><rect width="100%" height="100%" fill={color}></rect></g></svg>
            </div>
        </div>
    );
}

export default ProgressBar;