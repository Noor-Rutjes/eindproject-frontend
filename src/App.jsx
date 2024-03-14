import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/header/Header.jsx';
import necklace from './assets/necklace.jpg';
import { dragStart, dragEnd, dragOver, dragEnter, dragLeave, drop } from "./helpers/dragAndDrop.jsx";
import './App.css';

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [page, setPage] = useState(1); // State for current page
    const [totalResults, setTotalResults] = useState(0); // State for total results
    const pageSize = 5; // Number of results per page

    useEffect(() => {
        const controller = new AbortController();

        // Fetch paintings data from the API
        async function fetchPaintings() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(
                    `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`,
                    { signal: controller.signal }
                );
                setPaintings(response.data.userSet.setItems);
                setTotalResults(response.data.userSet.count); // Set total results
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchPaintings();

        // Cleanup function to abort fetching on unmount
        return function cleanup() {
            controller.abort();
        };
    }, [page]); // Trigger useEffect when page changes

    const nextPage = () => {
        setPage(page + 1); // Update page state to fetch next page
    };

    const prevPage = () => {
        setPage(page - 1); // Update page state to fetch previous page
    };

    useEffect(() => {
        // Add event listeners for drag and drop functionality
        const addEventListeners = () => {
            const boxes = document.querySelectorAll(".box");
            boxes.forEach(box => {
                box.addEventListener('dragover', dragOver);
                box.addEventListener('dragenter', dragEnter);
                box.addEventListener('dragleave', dragLeave);
                box.addEventListener('drop', drop);
            });
        };

        // Remove event listeners when component unmounts
        const removeEventListeners = () => {
            const boxes = document.querySelectorAll(".box");
            boxes.forEach(box => {
                box.removeEventListener('dragover', dragOver);
                box.removeEventListener('dragenter', dragEnter);
                box.removeEventListener('dragleave', dragLeave);
                box.removeEventListener('drop', drop);
            });
        };

        addEventListeners();

        return removeEventListeners;
    }, []);

    return (
        <>
            <Header />
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {loading && <p>Loading...</p>} {/* Show loading message */}
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
                    {/* Buttons for navigation */}
                    <div>
                        <button onClick={prevPage} disabled={page === 1}>Previous Page</button>
                        <span>Page {page}</span>
                        <button onClick={nextPage} disabled={(page * pageSize) >= totalResults}>Next Page</button>
                    </div>
                    <p>Total Results: {totalResults}</p> {/* Show total results */}
                </div>
            </div>
        </>
    );
}

export default App;
