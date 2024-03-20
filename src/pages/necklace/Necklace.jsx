import React, { useState } from 'react';
import necklace from '../../assets/necklace.jpg';
import { useFetchPaintings } from "../../helpers/fetchPaintings.jsx"; // Importeer de aangepaste hook
import { dragStart, dragEnd } from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';
import Button from "../../components/button/Button.jsx";

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 5;

    console.log("Necklace component rendered");
    useFetchPaintings(apiKey, page, pageSize, setPaintings, setTotalResults, toggleLoading, toggleError);
    console.log(paintings);

    return (
        <>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        <div className="button-container">
                            <Button
                                onClick={() => setPage(prevPage => prevPage - 1)}
                                disabled={page === 1}
                                text="Vorige"
                            />
                            <Button
                                onClick={() => setPage(prevPage => prevPage + 1)}
                                disabled={page * pageSize >= totalResults}
                                text="Volgende"
                            />
                        </div>
                        {loading && <p>Loading...</p>}
                        {!loading && paintings.map((painting, index) => (
                            <div
                                key={painting.id}
                                id={`painting-${index}`}
                                draggable="true"
                                onDragStart={(e) => dragStart(e, `painting-${index}`)}
                                onDragEnd={dragEnd}
                                className="painting"
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

