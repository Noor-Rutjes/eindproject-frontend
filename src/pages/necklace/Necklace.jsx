import React, { useState } from 'react';
import necklace from '../../assets/necklace.jpg';
import { useFetchPaintings } from "../../helpers/fetchPaintings.jsx"; // Importeer de aangepaste hook
import { dragStart, dragEnd } from "../../helpers/dragAndDrop.jsx";
import './Necklace.css';

function Necklace() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 5;
    useFetchPaintings(apiKey, page, pageSize, setPaintings, setTotalResults, toggleLoading, toggleError);

    return (
        <>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
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
                    <div>
                        <button onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>Previous Page</button>
                        <span>Page {page}</span>
                        <button onClick={() => setPage(prevPage => prevPage + 1)} disabled={(page * pageSize) >= totalResults}>Next Page</button>
                    </div>
                    <p>Total Results: {totalResults}</p> {/* Show total results */}
                </div>
            </div>
        </>
    );
}

export default Necklace;

