import React, {useState, useEffect} from 'react';
import necklace from '../../assets/necklace.png';
import useFavorites from "../../helpers/useFavorites.jsx";
import {dragStart, dragEnd} from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';
import {fetchFavoritePaintings} from "../../helpers/fetchPaintings.jsx";


function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const {favorites} = useFavorites();
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const page = 0;
    const pageSize = 100;
    const [boxContents, setBoxContents] = useState(Array(5).fill(null));
    const [activeBoxIndex, setActiveBoxIndex] = useState(-1);

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
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e, boxIndex) => {
        e.preventDefault();
        const paintingId = e.dataTransfer.getData('text/plain');
        const paintingToMove = favoritePaintings.find(painting => painting.id.toString() === paintingId);

        if (paintingToMove) {
            if (boxContents[boxIndex]) {
                const updatedBoxContents = [...boxContents];
                updatedBoxContents[boxIndex] = null;
                setBoxContents(updatedBoxContents);
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
                <img className="necklace-image" src={necklace} alt="ketting"/>
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
    );
}

export default Necklace;