import React, { useState, useEffect } from 'react';
import axios from 'axios';
import necklace from '../../assets/necklace.jpg';
import useFavorites from "../../helpers/useFavorites.jsx";
import { dragStart, dragEnd } from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';
import Button from "../../components/button/Button.jsx";

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites } = useFavorites();
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(favorites.length / pageSize);

    // Definieer de functie fetchFavoritePaintings, die verantwoordelijk is voor het ophalen van favoriete schilderijen van de Rijksmuseum API.
    // Dit wordt uitgevoerd elke keer dat de apiKey, favorites, of page veranderen.

    const fetchFavoritePaintings = async () => {
        console.log("Fetching favorite paintings...");
        setLoading(true);

        try {
            const response = await axios.get(`https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json`);
            console.log("API response:", response.data); // Log de API-reactie om te controleren of de juiste gegevens worden opgehaald
            const allPaintings = response.data.userSet.setItems;
            console.log("All paintings:", allPaintings); // Log de volledige lijst met schilderijen om te controleren of alle schilderijen worden opgehaald
            const filteredFavoritePaintings = allPaintings.filter(painting => favorites.includes(painting.id));
            console.log("Filtered favorite paintings:", filteredFavoritePaintings); // Log de gefilterde lijst met favoriete schilderijen
            setFavoritePaintings(filteredFavoritePaintings);
        } catch (error) {
            console.error("Error fetching favorite paintings:", error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        console.log("Fetching favorite paintings on mount...");
        fetchFavoritePaintings();
    }, [apiKey, favorites, page]);

    return (
        <>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        <div className="button-container">
                            <Button
                                onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                                disabled={page === 1}
                                text="Vorige"
                            />
                            <Button
                                onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
                                disabled={page === totalPages}
                                text="Volgende"
                            />
                        </div>
                            {loading && <p>Loading...</p>}
                            {!loading && favoritePaintings.map((painting, index) => (

                                <div
                                    key={index}
                                    id={`painting-${index}`}
                                    className="painting"
                                    draggable="true"
                                    onDragStart={(e) => dragStart(e, `painting-${index}`)}
                                    onDragEnd={dragEnd}
                                    style={{ width: '138px', height: '138px' }}
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