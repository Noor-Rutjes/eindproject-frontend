import { useEffect, useState } from 'react';
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

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const startIndex = Number(event.dataTransfer.getData('text/plain'));
        const updatedPainting = [...painting];

        const [draggedItem] = updatedPainting.splice(startIndex, 1);

        const boundingBox = event.target.getBoundingClientRect();

        const x = event.clientX - boundingBox.left;
        const y = event.clientY - boundingBox.top;

        draggedItem.position = { x, y };

        updatedPainting.push(draggedItem);

        setPainting(updatedPainting);
    };

    return (
        <>
            <Header />
            <div className="container" onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="paintings-overview">
                    {painting.map((setItem, index) => (
                        <div
                            key={`${setItem.image.cdnUrl}-${setItem.id}`}
                            className="draggable"
                            style={{
                                position: 'absolute',
                                left: setItem.position ? setItem.position.x : 0,
                                top: setItem.position ? setItem.position.y : 0,
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                        >
                            <img className="painting-image" src={setItem.image.cdnUrl} alt="schilderij" />
                        </div>
                    ))}
                </div>
                <img className="necklace-image" src={necklace2} alt="ketting" />
            </div>
        </>
    );
}

export default App;



// import {useEffect, useState} from 'react'
// import './App.css'
// import axios from "axios";
// import necklace2 from "./assets/img.png";
// import Header from "./components/header/Header.jsx";
//
// function App() {
//     const [painting, setPainting] = useState(null);
//     const [error, toggleError] = useState(false);
//     const [loading, toggleLoading] = useState(false);
//
//     useEffect(() => {
//         const controller = new AbortController();
//
//         async function fetchPainting() {
//             toggleError(false);
//             toggleLoading(true);
//
//             try {
//                 const response = await axios.get('https:www.rijksmuseum.nl/api/nl/usersets/1692024-bloemen?key=FsvdlDrC&format=json&page=7&pageSize=5', {
//                     signal: controller.signal,
//                 });
//                 setPainting(response);
//                 console.log(response);
//             } catch (e) {
//                 if (axios.isCancel(e)) {
//                     console.error('Request is canceled...');
//                 } else {
//                     console.error(e);
//                     toggleError(true);
//                 }
//             } finally {
//                 toggleLoading(false);
//             }
//         }
//
//         fetchPainting();
//
//         return function cleanup() {
//             controller.abort();
//         }
//     }, []);
//
//     return (
//         <>
//         <Header/>
//         <div className="container">
//         <div className="paintings-overview">
//             <>
//
//                 {painting &&
//                     <ul>
//                         {painting.data.userSet.setItems.map((setItem) => {
//                             const imageUrl = setItem.image && setItem.image.cdnUrl;
//                             if (!imageUrl) {
//                                 return null; // Sla dit item over als de afbeeldings-URL leeg is
//                             }
//                             return (
//                                 <li key={`${imageUrl}-${setItem.id}`}>
//                                     {imageUrl && <img className="painting-image" src={imageUrl} alt="schilderij"/>}
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 }
//                 {loading && <p>Loading...</p>}
//                 {painting && painting.data && painting.data.userSet && Array.isArray(painting.data.userSet.setItems) && painting.data.userSet.setItems.length === 0 && error && <p>Fout bij het ophalen van de schilderijen...</p>}
//
//                 {/*{painting.length === 0 && error && <p>Fout bij het ophalen van de schilderijen...</p>}*/}
//                 </>
//         </div>
//             <img className="necklace-image" src= {necklace2} alt="ketting" />
//         </div>
//         </>
//     )
// }
//
// export default App
