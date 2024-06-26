import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import './Home.css';
import happyman from '../../assets/contentBlock/happyman.png';
import Button from '../../components/button/Button.jsx';
import ContentBlock from '../../components/contentBlock/ContentBlock.jsx';

function Home() {
    const {isAuth, logout} = useContext(AuthContext);  // Retrieve authentication status and logout function
    const navigate = useNavigate();  // Initialize navigation hook

    return (
        <>
            <ContentBlock
                title="Ontwerp je eigen sieraad bij RijksBling!"
                mediaType="image"
                mediaSrc={happyman}
                alt="blije man die RijksBling ketting vasthoudt"
            >
                <div className="hero-text">
                    <p>Ben je een liefhebber van de kunst in het Rijksmuseum en op zoek naar iets écht bijzonders?</p>
                    <p>Met onze online ontwerptool voor sieraden kan jij jouw eigen unieke creatie maken met schilderijen uit het Rijksmuseum.</p>
                    <p>Het is eenvoudig - jij kiest de schilderijen, wij maken de ketting. Registreer je en probeer het uit!</p>
                </div>
                <nav>
                    {isAuth ? (
                        <Button onClick={logout}
                                text="Log uit"
                                type="button"/>
                    ) : (
                        <div className="hero-navigation">
                            <Button
                                onClick={() => navigate("/signup")}
                                text="Registreren"
                                type="button"
                            />
                            <Button
                                onClick={() => navigate("/signIn")}
                                text="Inloggen"
                                type="button"
                            />
                        </div>
                    )}
                </nav>
            </ContentBlock>

            <ContentBlock
                title="Hoe werkt het?"
                mediaType="video"
                mediaSrc="src/assets/contentBlock/rijksbling-demo.mp4"
            >
                <div className="hero-text">
                    <p>Blader door onze collectie schilderijen en selecteer je favorieten.</p>
                    <p>Heb je je keuze gemaakt? Ga dan naar de volgende pagina, waar je jouw gekozen kunstwerken kunt plaatsen en rangschikken om je eigen unieke ketting te creëren.</p>
                    <p>Klik <Link to="/paintings">hier</Link> om de schilderijen te bekijken.</p>
                </div>
            </ContentBlock>
        </>
    )
}

export default Home;
