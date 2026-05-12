import styles from "./ProgressBarOnly.module.scss";

interface ProgressBarOnlyProps {
    percent: number
}

const ProgressBarOnly = ({ percent }: ProgressBarOnlyProps) => {
    return (
        <div className={styles.bar}>
            <div className={styles.percent} style={{width: `${percent}%`}}>{percent}%</div>
            <svg fill="currentColor" role="img" width="100%" aria-hidden="true"><title>Diagonal A Loose</title><pattern id="DiagonalALoose-pattern-_R_5b69j6lb9l6_" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="currentColor"></rect><rect x="14" y="2" width="1" height="1" fill="currentColor"></rect><rect x="13" y="2" width="1" height="1" fill="currentColor"></rect><rect x="13" y="3" width="1" height="1" fill="currentColor"></rect><rect x="12" y="3" width="1" height="1" fill="currentColor"></rect><rect x="15" width="1" height="1" fill="currentColor"></rect><rect x="15" y="1" width="1" height="1" fill="currentColor"></rect><rect x="14" y="1" width="1" height="1" fill="currentColor"></rect><rect x="11" y="5" width="1" height="1" fill="currentColor"></rect><rect x="10" y="5" width="1" height="1" fill="currentColor"></rect><rect x="10" y="6" width="1" height="1" fill="currentColor"></rect><rect x="9" y="6" width="1" height="1" fill="currentColor"></rect><rect x="8" y="7" width="1" height="1" fill="currentColor"></rect><rect x="9" y="7" width="1" height="1" fill="currentColor"></rect><rect x="12" y="4" width="1" height="1" fill="currentColor"></rect><rect x="11" y="4" width="1" height="1" fill="currentColor"></rect><rect x="7" y="9" width="1" height="1" fill="currentColor"></rect><rect x="6" y="9" width="1" height="1" fill="currentColor"></rect><rect x="6" y="10" width="1" height="1" fill="currentColor"></rect><rect x="5" y="10" width="1" height="1" fill="currentColor"></rect><rect x="8" y="8" width="1" height="1" fill="currentColor"></rect><rect x="7" y="8" width="1" height="1" fill="currentColor"></rect><rect x="4" y="12" width="1" height="1" fill="currentColor"></rect><rect x="3" y="12" width="1" height="1" fill="currentColor"></rect><rect x="3" y="13" width="1" height="1" fill="currentColor"></rect><rect x="2" y="13" width="1" height="1" fill="currentColor"></rect><rect x="1" y="14" width="1" height="1" fill="currentColor"></rect><rect x="2" y="14" width="1" height="1" fill="currentColor"></rect><rect y="15" width="1" height="1" fill="currentColor"></rect><rect x="1" y="15" width="1" height="1" fill="currentColor"></rect><rect x="5" y="11" width="1" height="1" fill="currentColor"></rect><rect x="4" y="11" width="1" height="1" fill="currentColor"></rect></pattern><rect width="100%" height="100%" fill="url(#DiagonalALoose-pattern-_R_5b69j6lb9l6_)"></rect></svg>
        </div>
    );
}

export default ProgressBarOnly;