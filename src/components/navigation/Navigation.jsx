import React, {useState, useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx';
import Hamburger from "./Hamburger.jsx";
import './Navigation.css';
import Button from "../../components/button/Button.jsx";

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
                        <Button onClick={() => { logout(); closeHamburger(); }} text="Log uit" />
                    ) : (
                        <div>
                            <Button
                                onClick={() => { navigate("/signIn"); closeHamburger(); }}
                                text="Log in"
                            />
                            <Button
                                onClick={() => { navigate("/signup"); closeHamburger(); }}
                                text="Registreren"
                            />
                        </div>
                    )}
                </li>
            </ul>
                <div className="hamburger-container" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen}/>
                </div>

            </div>
        </nav>
    );
}
export default Navigation;
