import { useEffect, useState } from 'react';
import axios from 'axios';
import necklace2 from './assets/img.png';
import necklace3 from './assets/ketting.jpg'
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
                    'https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=FsvdlDrC&format=json&page=1&pageSize=5',

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

    function dragStart(e, id) {
        console.log("dragging");
        console.log("ID:", id);
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
    }, []);


    function cropAndResizeImage(imageUrl, cropX, cropY, cropWidth, cropHeight, targetWidth, targetHeight) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Allow cross-origin images
        img.src = imageUrl;

        return new Promise((resolve, reject) => {
            img.onload = function () {
                canvas.width = cropWidth;
                canvas.height = cropHeight;
                ctx.drawImage(img, -cropX, -cropY);

                const croppedImageUrl = canvas.toDataURL('image/png');

                const croppedImg = new Image();
                croppedImg.onload = function () {
                    const resizedCanvas = document.createElement('canvas');
                    const resizedCtx = resizedCanvas.getContext('2d');
                    resizedCanvas.width = targetWidth;
                    resizedCanvas.height = targetHeight;
                    resizedCtx.drawImage(croppedImg, 0, 0, targetWidth, targetHeight);

                    resolve(resizedCanvas.toDataURL('image/png'));
                };
                croppedImg.src = croppedImageUrl;
            };

            img.onerror = function (error) {
                reject(error);
            };
        });
    }


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
                                    // overflow: 'hidden'
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
