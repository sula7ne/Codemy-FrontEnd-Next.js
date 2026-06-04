import Link from "next/link";
import ProfileDropDown from "@/components/Layout/Header/ProfileDropDown/ProfileDropDown";
import clsx from "clsx";
import styles from "./HeaderActions.module.scss";
import { useAuth } from "@/state/hooks/useAuth";
import { useTranslations } from "next-intl";

const HeaderActions = () => {
    const t = useTranslations('Header');
    const { isAuth } = useAuth();

    return (
        <>
            {isAuth ?
                <>
                    <Link className={clsx(styles.create, styles.btn)} href='/courses/create' tabIndex={0}>
                        <div className={styles.icon}>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path></svg>
                        </div>
                        <span>{t('create')}</span>
                    </Link>

                    <ProfileDropDown />
                </>
                :
                <Link className={clsx(styles.auth, styles.btn)} href='/auth/login' tabIndex={0}>
                    <div className={styles.icon}>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 016.447 15.276 7 7 0 00-12.895 0A9 9 0 0112 3Zm0 2a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-.1 9.001L11.899 16a5 5 0 014.904 3.61A8.96 8.96 0 0112 21a8.96 8.96 0 01-4.804-1.391 5 5 0 014.704-3.608Z"></path></svg>
                    </div>
                    <span>{t('login')}</span>
                </Link>
            }
        </>
    );
}

export default HeaderActions;