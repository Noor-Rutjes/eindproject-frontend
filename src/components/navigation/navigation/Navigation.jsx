import React, {useState, useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext.jsx';
import './Navigation.css';
import Hamburger from "../hamburger/Hamburger.jsx";
import Button from "../../button/Button.jsx";

function Navigation() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    };
    const closeHamburger = () => {
        setHamburgerOpen(false);
    };
    const navigationClass = hamburgerOpen ? "navigation" : "navigation-closed";
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <div className="navigation-container">
                <ul className={navigationClass}>
                    <li>
                        <NavLink className="navigation-link" to="/" onClick={closeHamburger}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navigation-link" to="/paintings" onClick={closeHamburger}>
                            Schilderijen
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navigation-link" to="/necklace" onClick={closeHamburger}>
                            Ketting
                        </NavLink>
                    </li>
                    <li>
                        {isAuth ? (
                            <Button onClick={() => {
                                logout();
                                closeHamburger();
                            }}
                                    text="Uitloggen"
                                    type="button"/>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => {
                                        navigate("/signup");
                                        closeHamburger();
                                    }}
                                    text="Registreren"
                                    type="button"
                                />
                                <Button
                                    onClick={() => {
                                        navigate("/signIn");
                                        closeHamburger();
                                    }}
                                    text="Inloggen"
                                    type="button"
                                />
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            <div className="hamburger-container" onClick={toggleHamburger}>
                <Hamburger isOpen={hamburgerOpen}/>
            </div>
        </nav>
    );
}

export default Navigation;
