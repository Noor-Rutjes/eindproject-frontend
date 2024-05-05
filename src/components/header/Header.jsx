import icon from "../../assets/logo-header.png";
import "./Header.css";
import Navigation from "../navigation/Navigation.jsx";
import {Link} from "react-router-dom";
import React from "react";

function Header() {
    return (<>
        <header id="header">
            <Navigation/>
            <div className="header-container">
                <div className="header-text">
                    <p><Link to="/">RijksBling</Link></p>
                </div>
                <div className="header-icon">
                    <img src={icon} alt="logo RijksBling"/>
                </div>
            </div>
        </header>
    </>);
}

export default Header;