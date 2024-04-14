import React, { useState, useEffect } from 'react';
import { fetchPaintings } from "../../helpers/fetchPaintings.jsx";
import necklace from '../../assets/necklace.jpg';
import useFavorites from "../../helpers/useFavorites.jsx";
import { dragStart, dragEnd } from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';
import Button from "../../components/button/Button.jsx";

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites } = useFavorites();
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 33;

    useEffect(() => {
        const fetchFavoritePaintings = async () => {
            console.log("Fetching favorite paintings...");
            toggleLoading(true);

            try {
                const result = await fetchPaintings(apiKey, page, pageSize);
                toggleError(false);
                console.log("Fetched paintings:", result.paintings);

                // Filter favoriete schilderijen
                const filteredFavoritePaintings = result.paintings.filter(painting => favorites.includes(painting.id));
                console.log("Filtered favorite paintings:", filteredFavoritePaintings);
                setFavoritePaintings(filteredFavoritePaintings);
            } catch (error) {
                console.error("Error fetching paintings:", error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        };

        fetchFavoritePaintings();
    }, [apiKey, favorites, page, pageSize]);

    const totalPages = Math.ceil(favorites.length / pageSize);
    console.log("totalpages: " + totalPages);

    return (
        <>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {/*<div className="button-container">*/}
                        {/*    <Button*/}
                        {/*        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 0))}*/}
                        {/*        disabled={page === 0}*/}
                        {/*        text="Vorige"*/}
                        {/*    />*/}
                        {/*    <Button*/}
                        {/*        onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages - 1))}*/}
                        {/*        disabled={page === totalPages - 1}*/}
                        {/*        text="Volgende"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {loading && <p>Loading...</p>}
                        {!loading && favoritePaintings.map((painting, index) => (
                            <div
                                key={index}
                                id={`painting-${index}`}
                                className="painting"
                                draggable="true"
                                onDragStart={(e) => dragStart(e, `painting-${index}`)}
                                onDragEnd={dragEnd}
                                // style={{ width: '138px', height: '138px' }}
                            >
                                <img
                                    className="painting-image"
                                    src={painting.image.cdnUrl}
                                    alt="schilderij"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                    <img className="necklace-image" src={necklace} alt="ketting" />
                    {[...Array(5)].map((_, index) => (
                        <div key={`box${index}`} className="box" id={`box${index}`}></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Necklace;
