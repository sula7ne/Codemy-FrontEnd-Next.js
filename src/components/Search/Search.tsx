import { SubmitEvent, useRef, useState } from "react";

import Image from "next/image";
import clsx from "clsx";
import searchIcon from "@/assets/images/icons/search.svg"
import styles from "./Search.module.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Search = () => {
    const t = useTranslations('Header');
    const [isSearchFocus, setIsFocusFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const search = () => {
        const searchValue = inputRef.current?.value.trim();
        
        // if(searchValue) 
        router.push(`/courses/?search=${searchValue}`);
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        search();
    }

    return (
        <form 
            className={clsx(styles.search, isSearchFocus && styles.focus)}
            role="search"
            onSubmit={handleSubmit}
            onClick={() => inputRef.current?.focus()}
        >
            <button type="submit" onMouseDown={(e) => e.preventDefault()}>
                <div className={styles.icon}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path></svg>
                </div>
            </button>
            <input 
                ref={inputRef} type="text"
                placeholder={t('search')}
                autoComplete="off" autoCorrect="off" 
                onFocus={() => setIsFocusFocus(true)}
                onBlur={() => setIsFocusFocus(false)}
            />
        </form>
    )
};

export default Search;