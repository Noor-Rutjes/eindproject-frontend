import React, { useState, useEffect } from 'react';
import './Necklace.css';
import necklace from '../../assets/necklace.png';
import useFavorites from "../../helpers/useFavorites.jsx";
import { fetchFavoritePaintings } from "../../helpers/fetchPaintings.jsx";
import { dragStart, dragEnd, drop } from "../../helpers/dragAndDrop.jsx";

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites } = useFavorites();
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const page = 0;
    const pageSize = 100;
    const [dropBoxContents, setDropBoxContents] = useState(Array(5).fill(null));
    const [activeDropBoxIndex, setActiveDropBoxIndex] = useState(-1);

    useEffect(() => {
        const fetchFavoritePaintingsHelper = async () => {
            try {
                toggleLoading(true);
                const result = await fetchFavoritePaintings(apiKey, favorites, page, pageSize);
                setFavoritePaintings(result);
                toggleError(false);
            } catch (error) {
                console.error("Error fetching favorite paintings:", error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        };
        fetchFavoritePaintingsHelper();
    }, [apiKey, favorites, page, pageSize]);

    const handleDragStart = (e, id) => {
        dragStart(e, id);
    };

    const handleDrop = (e, dropBoxIndex) => {
        drop(e);
        const paintingId = e.dataTransfer.getData('text/plain');
        const paintingToMove = favoritePaintings.find(painting => painting.id.toString() === paintingId);

        if (paintingToMove) {
            if (dropBoxContents[dropBoxIndex]) {
                const updatedDropBoxContents = [...dropBoxContents];
                updatedDropBoxContents[dropBoxIndex] = null;
                setDropBoxContents(updatedDropBoxContents);
            }

            const updatedDropBoxContents = [...dropBoxContents];
            updatedDropBoxContents[dropBoxIndex] = paintingToMove;
            setDropBoxContents(updatedDropBoxContents);
            setActiveDropBoxIndex(dropBoxIndex);
        }
    };

    return (
        <div className="parent">
            <div className="container">
                <div className="paintings-overview">
                    {loading && <p>Loading...</p>}
                    {!loading && favoritePaintings.map((painting, index) => (
                        <div
                            key={index}
                            id={`painting-${index}`}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, painting.id.toString())}
                            onDragEnd={dragEnd}
                        >
                            <img
                                className="painting-image"
                                src={painting.image.cdnUrl}
                                alt="schilderij"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <img className="necklace" src={necklace} alt="ketting" />
                {[...Array(5)].map((_, index) => (
                    <div
                        key={`dropBox${index}`}
                        className={`dropBox`}
                        id={`dropBox${index}`}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {dropBoxContents[index] && (
                            <div
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, dropBoxContents[index].id.toString())}
                                onDragEnd={dragEnd}
                            >
                                <img
                                    src={dropBoxContents[index].image.cdnUrl}
                                    alt="schilderij"
                                    className="painting-image"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Necklace;
