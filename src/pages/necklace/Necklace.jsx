import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Necklace.css';
import necklace from '../../assets/necklace/necklace.png';
import Button from "../../components/button/Button.jsx";
import { captureAndDownloadNecklace } from '../../helpers/captureNecklaceCreation';
import { AuthContext } from '../../context/AuthContext';
import { dragStart, dragEnd, handleDrop } from '../../helpers/dragAndDrop';
import { fetchFavoritePaintings } from '../../helpers/fetchPaintings';

function Necklace() {

    const apiKey = import.meta.env.VITE_API_KEY;
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const necklaceRef = useRef(null);
    const buttonRef = useRef(null);

    // State hooks
    const [favorites, setFavorites] = useState(() => {
        // Get the initial favorites from localStorage
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dropBoxContents, setDropBoxContents] = useState(Array(5).fill(null));
    const [activeDropBoxIndex, setActiveDropBoxIndex] = useState(-1);
    const [screenshotLoading, setScreenshotLoading] = useState(false);

    // Fetch favorite paintings
    const fetchFavoritePaintingsHelper = useCallback(async (controller) => {
        try {
            setLoading(true);
            const result = await fetchFavoritePaintings(apiKey, favorites, 0, 100, controller.signal);
            setFavoritePaintings(result);
            setError(false);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching favorite paintings:", error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [apiKey, favorites]);

    useEffect(() => {
        const controller = new AbortController();
        fetchFavoritePaintingsHelper(controller);

        return () => {
            controller.abort(); // Cleanup the abort controller when component unmounts
        };
    }, [fetchFavoritePaintingsHelper]);

    const handleDragStart = useCallback((e, id) => {
        dragStart(e, id);
    }, []);

    const handleDragEnd = useCallback((e) => {
        dragEnd(e);
    }, []);

    const handleDropHandler = useCallback((e, dropBoxIndex) => {
        handleDrop(e, dropBoxIndex, dropBoxContents, setDropBoxContents, setActiveDropBoxIndex, favoritePaintings);
    }, [dropBoxContents, favoritePaintings]);

    // Function to handle screenshot process
    const handleScreenshot = useCallback(async () => {
        if (!isAuth) {
            alert('Je moet ingelogd zijn om het ontwerp te kunnen downloaden.');
            navigate('/signIn');
            return;
        }

        if (dropBoxContents.includes(null)) {
            alert('Alle 5 medaillons moeten gevuld zijn voordat je het ontwerp kunt downloaden.');
            return;
        }

        if (buttonRef.current) {
            buttonRef.current.classList.add('hidden'); // Hide the button during screenshot capture
        }

        setScreenshotLoading(true);

        try {
            // Capture and download the necklace design
            await captureAndDownloadNecklace(necklaceRef, 'RijksBling_ontwerp.png');
        } catch (error) {
            console.error('Error bij het downloaden van het ontwerp:', error);
        } finally {
            setScreenshotLoading(false);
        }
    }, [isAuth, dropBoxContents, navigate]);

    return (
        <main className="parent">
            {screenshotLoading && <div className="loading-message">Ontwerp wordt gedownload...</div>}
            <section className="container">
                <section className="paintings-overview">
                    {loading && <div className="spinner">Loading...</div>}

                    {!loading && favoritePaintings.map((painting, index) => (
                        <article
                            key={index}
                            data-id={painting.id.toString()}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, painting.id.toString())}
                            onDragEnd={handleDragEnd}
                        >
                            <img
                                className="painting-image"
                                src={painting.image.cdnUrl}
                                alt="schilderij"
                            />
                        </article>
                    ))}
                </section>
            </section>

            <section className="container" ref={necklaceRef} id="necklace-container">
                <img className="necklace" src={necklace} alt="ketting" />
                <Button
                    type="button"
                    id="screenshot-button"
                    ref={buttonRef}
                    onClick={handleScreenshot}
                    text="Download ontwerp"
                />

                {[...Array(5)].map((_, index) => (
                    <div
                        key={`dropBox${index}`}
                        className="dropBox"
                        id={`dropBox${index}`}
                        onDrop={(e) => handleDropHandler(e, index)}
                        onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
                    >
                        {dropBoxContents[index] && (
                            <article
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, dropBoxContents[index].id.toString())}
                                onDragEnd={handleDragEnd}
                            >
                                <img
                                    src={dropBoxContents[index].image.cdnUrl}
                                    alt="schilderij"
                                    className="painting-image"
                                    style={{ objectFit: 'cover' }}
                                />
                            </article>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Necklace;
