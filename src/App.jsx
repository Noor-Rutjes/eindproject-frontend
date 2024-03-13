import React, {useEffect, useState} from 'react';
import axios from 'axios';
import necklace3 from './assets/ketting.jpg'
import Header from './components/header/Header.jsx';
import './App.css';
import {dragStart, dragEnd, dragOver, dragEnter, dragLeave, drop} from "./helpers/dragAndDrop.jsx";

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        // Fetch paintings data from the API
        async function fetchPaintings() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(
                    `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=1&pageSize=5`,

                    {signal: controller.signal}
                );
                // console.log(response);
                setPaintings(response.data.userSet.setItems);
            } catch (e) {
                if (axios.isCancel(e)) {
                    // console.error('Request is canceled...');
                    // } else {
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
    }, []);


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
            <Header/>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {paintings.map((painting, index) => (
                            <div
                                key={painting.id}
                                id={`painting-${index}`}
                                draggable="true"
                                onDragStart={(e) => dragStart(e, `painting-${index}`)}
                                onDragEnd={dragEnd}
                                className="painting"
                                style={{width: '165px', height: '165px'}}
                            >
                                <img
                                    className="painting-image"
                                    src={painting.image.cdnUrl}
                                    alt="schilderij"
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                            </div>
                        ))}
                    </div>
                    <img className="necklace-image" src={necklace3} alt="ketting"/>
                    {[...Array(5)].map((_, index) => (
                        <div key={`box${index}`} className="box" id={`box${index + 1}`}></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;