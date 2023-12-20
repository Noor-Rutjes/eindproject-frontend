import icon from "../../assets/logo-transparent.png";
import "./Header.css";

function Header() {
    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-top">
                        <div className="header-logo">
                            <p>RijksBling</p>
                        </div>
                        <div className="header-icon">
                            <img src={icon} alt="logo"/>
                        </div>
                    </div>
                    <div className="header-bottom">
                        <div className="navigation">

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;