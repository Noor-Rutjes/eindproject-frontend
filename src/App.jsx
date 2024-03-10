import {useEffect, useState} from 'react';
import axios from 'axios';
import necklace2 from './assets/img.png';
import Header from './components/header/Header.jsx';
import './App.css';

function App() {
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
                    'https://www.rijksmuseum.nl/api/nl/usersets/1692024-bloemen?key=FsvdlDrC&format=json&page=7&pageSize=5',
                    {
                        signal: controller.signal,
                    }
                );
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


    function dragStart(e, id) {
        console.log("dragging");
        console.log("ID:", id); // Voeg deze regel toe om ook de id te loggen
        e.dataTransfer.setData('text/plain', id);

        const element = document.getElementById(id);
        if (element) {
            element.classList.add("opacity-dragging");
        }
    }

    function dragEnd() {
        console.log("dragging is done");

        const invisibleElements = document.querySelectorAll(".opacity-dragging");
        invisibleElements.forEach(element => {
            element.classList.remove("opacity-dragging");
            this.className = "painting-image";
        });
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const paintingId = e.dataTransfer.getData('text/plain');
        const paintingElement = document.getElementById(paintingId);
        if (paintingElement) {
            paintingElement.classList.remove("opacity-dragging");
            paintingElement.classList.add("painting-image");
            e.target.appendChild(paintingElement);
        }
    }

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
    }, [painting]);

    return (
        <>
            <Header/>
            <div className="parent">
                <div className="container">
                    <div className="paintings-overview">
                        {painting.map((setItem, index) => (// Voeg index parameter toe aan de mapfunctie
                            <div
                                key={setItem.id}
                                id={`painting-${index}`} // Gebruik index om unieke id te genereren
                                draggable="true"
                                onDragStart={(e) => dragStart(e, `painting-${index}`)} // Voeg handleDragStart toe met de gegenereerde id
                                onDragEnd={dragEnd} // Voeg de onDragEnd handler toe
                                className="painting"

                            >
                                <img
                                    className="painting-image"
                                    src={setItem.image.cdnUrl}
                                    alt="schilderij"
                                />
                            </div>
                        ))}
                    </div>
                    <img className="necklace-image" src={necklace2} alt="ketting"/>
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

