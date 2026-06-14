import { useEffect, useState, type KeyboardEvent } from "react";

interface SearchBarProps {
    placeHolderText?: string;

    onQuery: (query: string) => void;
}

const SearchBar = ({ placeHolderText = 'Buscar', onQuery }: SearchBarProps) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onQuery(query)
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, onQuery]);

    const handleSearch = () => {
        onQuery(query);
        //setQuery('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeHolderText}
                value={query}
                onChange={(event) => setQuery(event.target.value)}

                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar
