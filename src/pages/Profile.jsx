import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import axios from 'axios';
import ContentBlock from "../components/contentBlock/ContentBlock.jsx";
import happywoman from "../assets/happywoman.png";

function Profile() {
    const endpoint = "https://frontend-educational-backend.herokuapp.com/";
    const [profileData, setProfileData] = useState({});
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // we halen de pagina-content op in de mounting-cycle
        async function fetchProfileData() {
            // haal de token uit de Local Storage om in het GET-request te bewijzen dat we geauthoriseerd zijn
            const token = localStorage.getItem('token');

            try {
                const result = await axios.get(`${endpoint}api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchProfileData();
    }, [])

    return (
            <ContentBlock
                // title="Profielpagina"
                image={happywoman}
                alt={"vrouw die RijksBling ketting draagt"}
            >
                <h1>Welkom, {user.username}!</h1>
            <div>
                {/*<h2>Gegevens</h2>*/}
                {/*<p><strong>Gebruikersnaam:</strong> {user.username}</p>*/}
                <p>je e-mailadres is: {user.email}</p>
              <p>Terug naar de <Link to="/">Homepagina</Link></p>

            </div>


              {/*Als er keys in ons object zitten hebben we data, en dan renderen we de content*/}
                {/*{Object.keys(profileData).length > 0 &&*/}
                {/*    <section>*/}
                {/*      <h2>Strikt geheime profiel-content</h2>*/}
                {/*      <h3>{profileData.title}</h3>*/}
                {/*      <p>{profileData.content}</p>*/}
                {/*    </section>*/}
                {/*}*/}
            </ContentBlock>
    );
}

export default Profile;