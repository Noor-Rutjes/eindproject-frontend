import React, { useState, useEffect } from 'react';
import { fetchPaintings } from "../../helpers/fetchPaintings.jsx";
import './Paintings.css';
import Button from "../../components/button/Button.jsx"
import useFavorites from "../../helpers/useFavorites.jsx";



function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites, toggleFavorite } = useFavorites();
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 8;
    const totalPages = Math.ceil(totalResults / pageSize);


    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleLoading(true);
                const result = await fetchPaintings(apiKey, page, pageSize);
                setPaintings(result.paintings);
                setTotalResults(result.totalResults);
                toggleError(false);
                console.log("Fetched paintings:", result.paintings);
                console.log("Total results: ", result.totalResults)
            } catch (error) {
                console.error("Error fetching paintings:", error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        };

        fetchData();
    }, [apiKey, page, pageSize]);

    return (
        <>
            <div className="general-container">
            <div className="button-container">
                <Button
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 0))}
                    disabled={page === 0}
                    text="Vorige"

                />
                <Button
                    onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={page === totalPages -1}
                    text="Volgende"

                />
            </div>
            <div className="paintings-container">
                {loading && <p>Loading...</p>}
                {!loading && paintings.map((painting, index) => (
                    <div
                        key={painting.id}
                        id={`painting-${index}`}
                        className="painting-image-square"
                    >
                        <img
                            className="painting-square"
                            src={painting.image.cdnUrl}
                            alt="schilderij"
                        />
                        <div
                            className="favorite-heart"
                            onClick={() => toggleFavorite(painting.id)}
                        >
                            {favorites.includes(painting.id) ? '❤️' : '🤍'}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default Paintings;