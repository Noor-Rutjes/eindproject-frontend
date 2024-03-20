import React, { useState, useEffect } from 'react';
import { fetchPaintings } from "../../helpers/fetchPaintings.jsx"; // Aangepast om de fetchPaintings-functie rechtstreeks te importeren
import './Paintings.css';

function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleLoading(true);
                const result = await fetchPaintings(apiKey, page, pageSize); // Gebruik de fetchPaintings-functie
                setPaintings(result.paintings);
                setTotalResults(result.totalResults);
                toggleError(false);
                console.log("Fetched paintings:", result.paintings);
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
            <div className="button-container">
                <button type="button" className="nav-button" onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>vorige</button>
                <button type="button" className="nav-button" onClick={() => setPage(prevPage => prevPage + 1)} disabled={(page * pageSize) >= totalResults}>volgende</button>
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
                    </div>
                ))}
            </div>
        </>
    );
}

export default Paintings;
