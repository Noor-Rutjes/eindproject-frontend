import icon from "../../assets/logo-header.png";
// import Hamburger from "../hamburger/Hamburger.jsx";
import "./Header.css";
import Navigation from "../navigation/Navigation.jsx";

function Header() {
    return (<>
        <header>
            <div className="header-container">
                    <Navigation />
                    <div className="header-logo">
                        <p>Rijks Bling</p>
                    </div>
                    <div className="header-icon">
                        <img src={icon} alt="logo"/>
                </div>
            </div>
        </header>
    </>);
}

export default Header;