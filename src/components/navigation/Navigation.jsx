import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Hamburger from "../hamburger/Hamburger.jsx";
import './Navigation.css';

function Navigation() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <nav>
            <div className="hamburger-container" onClick={toggleHamburger}>
                <Hamburger isOpen={hamburgerOpen}/>
            </div>

            <ul className="navigation-container">
                <li
                    className={hamburgerOpen ? "navigation" : "navigation-closed"}>
                    <NavLink className="navigation-link" to="/">
                        Home
                    </NavLink>
                </li>
                <li className={hamburgerOpen ? "navigation" : "navigation-closed"}>
                    <NavLink className="navigation-link" to="/paintings">
                        Schilderijen
                    </NavLink>
                </li>
                <li className={hamburgerOpen ? "navigation" : "navigation-closed"}>
                    <NavLink className="navigation-link" to="/necklace">
                        Ketting
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
