import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Necklace.css';
import necklace from '../../assets/necklace/necklace.png';
import Button from "../../components/button/Button.jsx";
import useFavorites from '../../helpers/useFavorites.jsx';
import { fetchFavoritePaintings } from '../../helpers/fetchPaintings.jsx';
import { captureAndDownloadNecklace } from '../../helpers/captureNecklaceCreation.jsx';
import { AuthContext } from '../../context/AuthContext';
import { dragStart, dragEnd, handleDrop } from '../../helpers/dragAndDrop.jsx'; // Import helper functions

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
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const necklaceRef = useRef(null);
    const buttonRef = useRef(null);

    const fetchFavoritePaintingsHelper = useCallback(async (controller) => {
        try {
            toggleLoading(true);
            const result = await fetchFavoritePaintings(apiKey, favorites, page, pageSize, controller.signal);
            setFavoritePaintings(result);
            toggleError(false);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error("Error fetching favorite paintings:", error);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }, [apiKey, favorites, page, pageSize]);

    useEffect(() => {
        const controller = new AbortController();
        fetchFavoritePaintingsHelper(controller);

        return () => {
            controller.abort(); // Abort the fetch request on component unmount
        };
    }, [fetchFavoritePaintingsHelper]);

    useEffect(() => {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
            top: headerHeight,
            behavior: 'smooth'
        });
    }, []);

    const handleDragStart = useCallback((e, id) => dragStart(e, id), []);
    const handleDragEnd = useCallback((e) => dragEnd(e), []);
    const handleDropHandler = useCallback((e, dropBoxIndex) => {
        handleDrop(e, dropBoxIndex, dropBoxContents, setDropBoxContents, setActiveDropBoxIndex, favoritePaintings);
    }, [dropBoxContents, favoritePaintings]);

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

        setScreenshotLoading(true);

        try {
            await captureAndDownloadNecklace(necklaceRef, buttonRef, 'RijksBling ontwerp.png');
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
                    {loading && <p>Loading...</p>}
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
                        onDragOver={(e) => e.preventDefault()}
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