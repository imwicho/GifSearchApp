interface PreviousSearchesProps {
    previousSearchList: string[];

    onLabelClicked: (term: string) => void;
}

const PreviousSearches = ({ previousSearchList, onLabelClicked }: PreviousSearchesProps) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas previas</h2>
            {
                previousSearchList.length === 0 && (
                    <p>No hay búsquedas prevías</p>
                )
            }
            <ul className="previous-searches-list">
                {previousSearchList.map((term) => (
                    <li key={term}
                        onClick={() => onLabelClicked(term)}
                    >{term}</li>
                ))}
            </ul>
        </div>
    )
}

export default PreviousSearches
