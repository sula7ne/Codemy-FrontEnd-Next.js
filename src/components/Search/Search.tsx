import { SubmitEvent, useRef, useState } from "react";

import Image from "next/image";
import clsx from "clsx";
import searchIcon from "@/assets/images/icons/search.svg"
import styles from "./Search.module.scss";
import { useRouter } from "next/navigation";

const Search = () => {
    const [isSearchFocus, setIsFocusFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const search = () => {
        const searchValue = inputRef.current?.value.trim();
        
        if(searchValue) router.push(`/courses/?search=${searchValue}`);
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
                <Image src={searchIcon} alt="search icon" />
            </button>
            <input 
                ref={inputRef} type="text"
                placeholder="Чему вы хотите научиться?"
                autoComplete="off" autoCorrect="off" 
                onFocus={() => setIsFocusFocus(true)}
                onBlur={() => setIsFocusFocus(false)}
            />
        </form>
    )
};

export default Search;