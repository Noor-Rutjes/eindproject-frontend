import './Home.css';
import React, {useContext} from "react";
import model from '../../assets/model.png';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx';


function Home() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();


    return (
        <>
            <section className="hero-section">
                <div className="image-container">
                    <img
                        className="model"
                        src={model}
                        alt="vrouw die RijksBling ketting draagt"
                    />
                </div>

                <div className="hero-container">
                    <h1 className="hero-title">Ontwerp je eigen sieraad bij RijksBling!</h1>

                    <div className="hero-text">
                        <p>Ben je een liefhebber van kunst in het Rijksmuseum en op zoek naar iets echt bijzonders?</p>
                        <p> Met onze online ontwerptool voor sieraden kan jij jouw eigen unieke creatie maken met
                            schilderijen uit het Rijksmuseum.</p>
                        <p>Het is eenvoudig - jij kiest de schilderijen, wij maken de ketting. Registreer je en probeer
                            het eens uit!</p>
                    </div>

                    <nav>
                        {isAuth ? (
                            <Button onClick={() => {
                                logout();
                            }} text="Log uit"/>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => {
                                        navigate("/signIn");
                                    }}
                                    text="Log in"
                                />
                                <Button
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                    text="Registreer"
                                />
                                <Button
                                    onClick={() => {
                                        navigate("/paintings");
                                    }}
                                    text="Schilderijen"
                                />
                            </div>

                        )}
                    </nav>

                </div>
            </section>
        </>
    )
}

export default Home;
