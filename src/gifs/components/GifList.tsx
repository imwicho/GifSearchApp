import type { Gif } from "../interfaces/gif.interface";


interface GifListProps {
    gifs: Gif[];
}


const GifList = ({ gifs }: GifListProps) => {

    if (gifs.length === 0) {
        return (
            <h2 className="content-center">No se encontraron resultados.</h2>
        );
    };

    return (
        <div className="gifs-container">
            {
                gifs.map((gif) => (
                    <div key={gif.id} className="gif-card">
                        <img src={gif.url} alt={gif.title} />
                        <h3>{gif.title}</h3>
                        <p>{gif.width}x{gif.height} (1.5mb)</p>
                    </div>
                ))
            }
        </div>
    );
};

export default GifList
