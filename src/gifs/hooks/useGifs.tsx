import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

export const useGifs = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(term);
    };

    const handleSearch = async (query: string) => {
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery.length === 0) return;

        if (previousTerms.includes(normalizedQuery)) return;

        setPreviousTerms(previousTerms => [normalizedQuery, ...previousTerms].slice(0, 8));

        const gifs = await getGifsByQuery(normalizedQuery);
        setGifs(gifs);
    };


    return {
        //Properties
        previousTerms,
        gifs,
        // Methods / Actions
        handleTermClicked,
        handleSearch
    }
}
