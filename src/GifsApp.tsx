import GifList from "./gifs/components/GifList";
import PreviousSearches from "./gifs/components/PreviousSearches";
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"

import { useGifs } from "./gifs/hooks/useGifs";

const GifsApp = () => {

    const { previousTerms, gifs, handleTermClicked, handleSearch } = useGifs();

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
