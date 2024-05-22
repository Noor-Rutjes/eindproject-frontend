import React, { useState, useEffect } from 'react';
import './Necklace.css';
import necklace from '../../assets/necklace.png';
import useFavorites from "../../helpers/useFavorites.jsx";
import { fetchFavoritePaintings } from "../../helpers/fetchPaintings.jsx";
import { dragStart, dragEnd, drop } from "../../helpers/dragAndDrop.jsx";
import { captureNecklaceCreation, downloadImage } from '../../helpers/captureNecklaceCreation.jsx';
import Button from "../../components/button/Button.jsx";

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
    const [screenshotLoading, setScreenshotLoading] = useState(false);

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

    const handleScreenshot = async () => {
        setScreenshotLoading(true);
        try {
            const dataUrl = await captureNecklaceCreation('necklace-container');
            if (dataUrl) {
                // Voor nu lokaal downloaden om te verifiëren
                downloadImage(dataUrl, 'screenshot.png');
                console.log("Screenshot gemaakt en gedownload.");
            }
        } catch (error) {
            console.error('Error taking screenshot:', error);
        } finally {
            setScreenshotLoading(false);
        }
    };

    return (
        <div className="parent">
            {screenshotLoading && <div className="loading-message">Ontwerp wordt opgeslagen...</div>}
            <div className="container">
                <div className="paintings-overview">
                    <Button
                        onClick={handleScreenshot}
                        text="Ontwerp opslaan"
                    />
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

            <div className="container" id="necklace-container">
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
