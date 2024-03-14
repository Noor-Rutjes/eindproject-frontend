import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger.jsx";
import Home from "../../pages/home/Home.jsx";
import './Navigation.css';

function Navigation() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div className="navigation__container">
            <Routes className={hamburgerOpen ? "navigation__standard" : "navigation-closed navigation__standard"}>
                <Route path="/home" element={<Home />} />
            </Routes>
            <div className="hamburger-outer-container" onClick={toggleHamburger}>
                <Hamburger isOpen={hamburgerOpen}/>
            </div>
        </div>
    );
}

export default Navigation;
