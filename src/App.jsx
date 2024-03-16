import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Necklace from './pages/necklace/Necklace.jsx';
import Paintings from "./pages/paintings/Paintings.jsx";
import Home from './pages/home/Home.jsx';
import './App.css';

function App() {

    return (
        <>
            <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/paintings" element={<Paintings />} />
                        <Route path="/necklace" element={<Necklace />} />
                    </Routes>
        </>
    );
}

export default App;