import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/header/logo-header.png";
import iconHover from "../../assets/header/logo-header-horror.png";
import "./Header.css";
import Navigation from "../navigation/navigation/Navigation.jsx";

function Header() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <header id="header">
                <Navigation />
                <div className="header-container">
                    <div className="header-text">
                        <p><Link to="/">RijksBling</Link></p>
                    </div>
                    <div
                        className="header-icon"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={isHovered ? iconHover : icon}
                            alt="logo RijksBling"
                        />
                        <div className="tooltip">
                            © 2024 RijksBling. Alle rechten voorbehouden.
                            De inhoud van deze website, inclusief maar niet beperkt tot teksten,
                            afbeeldingen, grafieken, en videos, is eigendom van RijksBling en is
                            beschermd door auteursrecht en andere intellectuele eigendomswetten.
                            Het is niet toegestaan om enige inhoud van deze website te kopiëren,
                            reproduceren, herpubliceren, uploaden, posten, over te brengen, of
                            distribueren zonder voorafgaande schriftelijke toestemming van
                            RijksBling.
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
