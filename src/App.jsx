import React,  { useEffect, useState } from 'react';
import axios from 'axios';
import necklace3 from './assets/ketting.jpg'
import Header from './components/header/Header.jsx';
import './App.css';
import {dragStart, dragEnd, dragOver, dragEnter, dragLeave, drop} from "./helpers/dragAndDrop.jsx";

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [painting, setPainting] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPainting() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(
                    `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=1&pageSize=5`,

                    {
                        signal: controller.signal,
                    }
                );
                console.log(response);
                setPainting(response.data.userSet.setItems);
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

        fetchPainting();

        return function cleanup() {
            controller.abort();
        };
    }, []);


    useEffect(() => {
        const boxes = document.querySelectorAll(".box");
        for (let box of boxes) {
            box.addEventListener('dragover', dragOver);
            box.addEventListener('dragenter', dragEnter);
            box.addEventListener('dragleave', dragLeave);
            box.addEventListener('drop', drop);
        }

        return () => {
            for (let box of boxes) {
                box.removeEventListener('dragover', dragOver);
                box.removeEventListener('dragenter', dragEnter);
                box.removeEventListener('dragleave', dragLeave);
                box.removeEventListener('drop', drop);
            }
        };
    }, []);

    return (
        <>
            <Header/>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {painting.map((setItem, index) => (
                            <div
                                key={setItem.id}
                                id={`painting-${index}`}
                                draggable="true"
                                onDragStart={(e) => dragStart(e, `painting-${index}`)}
                                onDragEnd={dragEnd}
                                className="painting"
                                style={{
                                    width: '165px',
                                    height: '165px',
                                }}
                            >
                                <img
                                    className="painting-image"
                                    src={setItem.image.cdnUrl}
                                    alt="schilderij"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <img className="necklace-image" src={necklace3} alt="ketting"/>
                    <div className="box" id="box1"></div>
                    <div className="box" id="box2"></div>
                    <div className="box" id="box3"></div>
                    <div className="box" id="box4"></div>
                    <div className="box" id="box5"></div>
                </div>
            </div>
        </>
    );
}

export default App;
