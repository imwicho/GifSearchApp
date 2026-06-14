import GifList from "./gifs/components/GifList";
import PreviousSearches from "./gifs/components/PreviousSearches";
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

const GifsApp = () => {
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

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

            {/* Search */}
            <SearchBar
                placeHolderText="Buscar Gifs"
                onQuery={handleSearch}
            />

            {/* Búsquedas prevías */}
            <PreviousSearches
                previousSearchList={previousTerms}
                onLabelClicked={handleTermClicked}
            />

            {/* Gifs */}
            <GifList gifs={gifs} />
        </>
    )
}

export default GifsApp
