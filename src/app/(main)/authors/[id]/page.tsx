"use client"

import NotFound from "@/components/NotFound/NotFound";
import { authors } from "@/data/authors";
import { useParams } from "next/navigation";

const Author = () => {
    const params = useParams();
    const id = params.id;
    
    const author = authors.find(el => el.id === id);

    if(!author) return <NotFound />;
    
    return (
        <div>{author.name}</div>
    );
}

export default Author;