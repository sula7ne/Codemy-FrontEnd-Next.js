"use client"

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import styles from './Settings.module.scss';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const Settings = () => {
    const t = useTranslations('Settings');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        
        router.push(newPath);
    };

    if (!mounted) return null;

    return (
        <div className={styles.settings}>
            <h2 className={styles.title}>{t('title')}</h2>

            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.icon}>
                            <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M21.861 14.006a8 8 0 01-10.87-10.87c.452-.816-.101-1.976-1-1.721C5.379 2.724 2 6.965 2 11.998c0 6.075 4.925 11 11 11 5.032 0 9.275-3.38 10.584-7.992.255-.9-.905-1.451-1.723-1Zm-1.137 2.616A9 9 0 118.376 4.275 10 10 0 008 6.998c0 5.522 4.477 10 10 10 .943 0 1.857-.131 2.724-.376Z"></path></svg>
                        </div>

                        <div className={styles.text}>
                            <h4 className={styles['container-title']}>{t('theme')}</h4>
                            <p className={styles.description}>{t('themeDescription')}</p>
                        </div>
                    </div>
                    
                    <div className={styles.right}>
                        <select value={theme} onChange={(e) => setTheme(e.target.value)} name="theme" id="theme" defaultValue="system">
                            <option value="system">{t('themes.system')}</option>
                            <option value="light">{t('themes.light')}</option>
                            <option value="dark">{t('themes.dark')}</option>
                        </select>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.icon}>
                            <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M10 2.5a1 1 0 00-2 0V4H2a1 1 0 000 2h9.925c-.204 1.334-.833 2.627-1.975 4.15-.287.382-.603.777-.95 1.184-.328-.385-.645-.78-.95-1.184C7.478 9.387 7.035 8.682 6.709 8h-2.17c.415 1.125 1.06 2.216 1.911 3.35.361.48.763.977 1.206 1.49-1.196 1.285-2.645 2.735-4.363 4.453a1 1 0 101.414 1.414l.057-.057C6.38 17.036 7.795 15.619 9 14.33c.748.8 1.577 1.65 2.485 2.565l.846-1.99a105.74 105.74 0 01-1.987-2.066c.443-.512.845-1.008 1.206-1.489 1.342-1.79 2.175-3.474 2.393-5.35H16a1 1 0 100-2h-6V2.5Zm6.33 8.109-4.25 10a1 1 0 101.84.782L14.937 19h5.126l1.017 2.391a1 1 0 101.84-.782l-4.25-10a1 1 0 00-.92-.609h-.5a1 1 0 00-.92.609Zm1.17 2.36L19.213 17h-3.426l1.713-4.031Z"></path></svg>
                        </div>

                        <div className={styles.text}>
                            <h4 className={styles['container-title']}>{t('lang')}</h4>
                            <p className={styles.description}>{t('langDescription')}</p>
                        </div>
                    </div>
                    
                    <div className={styles.right}>
                        <select name="language" id="language" value={locale} onChange={handleLanguageChange}>
                            <option value="ru">{t('languages.ru')}</option>
                            <option value="kz">{t('languages.kz')}</option>
                            <option value="en">{t('languages.en')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;