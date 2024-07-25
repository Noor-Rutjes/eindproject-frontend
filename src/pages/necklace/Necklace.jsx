import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Necklace.css';
import necklace from '../../assets/necklace/necklace.png';
import Button from "../../components/button/Button.jsx";
import useFavorites from '../../hooks/useFavorites';
import useFetchFavoritePaintings from '../../hooks/useFetchFavoritePaintings';
import { captureAndDownloadNecklace } from '../../helpers/captureNecklaceCreation';
import { AuthContext } from '../../context/AuthContext';
import { dragStart, dragEnd, handleDrop } from '../../helpers/dragAndDrop';

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites } = useFavorites();
    const { favoritePaintings, error, loading } = useFetchFavoritePaintings(apiKey, favorites);
    const [dropBoxContents, setDropBoxContents] = useState(Array(5).fill(null));
    const [activeDropBoxIndex, setActiveDropBoxIndex] = useState(-1);
    const [screenshotLoading, setScreenshotLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const necklaceRef = useRef(null);
    const buttonRef = useRef(null);

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
                    {loading && <div className="spinner">Loading...</div>}

                    {/*{loading && <p>Loading...</p>}*/}
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
