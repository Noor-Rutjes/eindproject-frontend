import React, {useState, useEffect} from 'react';
import {fetchPaintings} from "../../helpers/fetchPaintings.jsx";
import necklace from '../../assets/necklace.jpg';
import useFavorites from "../../helpers/useFavorites.jsx";
import {dragStart, dragEnd} from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';
import {array} from "prop-types";

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const {favorites} = useFavorites();
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 33;
    const [boxContents, setBoxContents] = useState(Array(5).fill(null)); // State voor de inhoud van de vakjes
    const [activeBoxIndex, setActiveBoxIndex] = useState(-1); // State om bij te houden welke box actief is


    useEffect(() => {
        const fetchFavoritePaintings = async () => {
            console.log("Fetching favorite paintings...");
            toggleLoading(true);

            try {
                const result = await fetchPaintings(apiKey, page, pageSize);
                toggleError(false);
                console.log("Fetched paintings:", result.paintings);

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
    console.log("total pages: " + totalPages);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e, boxIndex) => {
        e.preventDefault();
        const paintingId = e.dataTransfer.getData('text/plain');
        const paintingToMove = favoritePaintings.find(painting => painting.id.toString() === paintingId);

        if (paintingToMove) {
            // Verplaats vorige painting terug naar paintings-overview als er al een painting in de box zit
            if (boxContents[boxIndex]) {
                const updatedBoxContents = [...boxContents];
                const previousPainting =updatedBoxContents[boxIndex];
                updatedBoxContents[boxIndex] = null;
                setBoxContents(updatedBoxContents);
                setFavoritePaintings(prevState =>[...prevState, previousPainting]);
            }

            // Plaats nieuwe painting in de box
            const updatedBoxContents = [...boxContents];
            updatedBoxContents[boxIndex] = paintingToMove;
            setBoxContents(updatedBoxContents);
            setActiveBoxIndex(boxIndex);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {loading && <p>Loading...</p>}
                        {!loading && favoritePaintings.map((painting, index) => (
                            <div
                                key={index}
                                id={`painting-${index}`}
                                className="painting"
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, painting.id.toString())}
                                onDragEnd={dragEnd}
                            >
                                <img
                                    className="painting-image"
                                    src={painting.image.cdnUrl}
                                    alt="schilderij"
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                            </div>
                        ))}
                    </div>
                    <img className="necklace-image" src={necklace} alt="ketting"/>
                    <div className="boxes-container">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={`box${index}`}
                                className={`box`}
                                id={`box${index}`}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {boxContents[index] && (
                                    <div
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, boxContents[index].id.toString())}
                                        onDragEnd={dragEnd}
                                    >
                                        <img
                                            src={boxContents[index].image.cdnUrl}
                                            alt="schilderij"
                                            className="painting-image"
                                            style={{objectFit: 'cover'}}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Necklace;
