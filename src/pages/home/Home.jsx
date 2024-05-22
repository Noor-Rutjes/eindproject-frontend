import './Home.css';
import React, {useContext} from "react";
import happyman from '../../assets/happyman.png';
import Button from "../../components/button/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import ContentBlock from "../../components/contentBlock/ContentBlock.jsx";


function Home() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <ContentBlock
                title="Ontwerp je eigen sieraad bij RijksBling!"
                image={happyman}
                alt={"blije man die RijksBling ketting vasthoudt"}
            >
                <div className="hero-text">
                    <p>Ben je een liefhebber van de kunst in het Rijksmuseum en op zoek naar iets écht bijzonders?</p>
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
                        <div className="hero-navigation">
                            <Button
                                onClick={() => {
                                    navigate("/signIn");
                                }}
                                text="Inloggen"
                            />
                            <Button
                                onClick={() => {
                                    navigate("/signup");
                                }}
                                text="Registreren"
                            />
                            <p>Bekijk de <Link to="/paintings">Schilderijen</Link></p>
                        </div>
                    )}
                </nav>
            </ContentBlock>

            <ContentBlock
                title="Hoe werkt het?"
            >
                <div className="hero-text">
                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aliquam aliquid at
                        commodi consequuntur corporis debitis deleniti doloremque dolorum ea et expedita harum illo
                        illum impedit, in ipsa ipsum iste laborum molestiae nulla optio provident quidem quisquam quod
                        reiciendis repudiandae sapiente sit tenetur unde vel veniam vitae. Aspernatur, quasi.
                    </p>
                </div>
            </ContentBlock>
        </>
    )
}

export default Home;