import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import ContentBlock from "../components/contentBlock/ContentBlock.jsx";
import {Link} from "react-router-dom";
import happywoman from "../assets/happywoman.png";
import Button from "../components/button/Button.jsx";

function Profile() {
    const {user, logout} = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            console.log("User is not authenticated.");
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <ContentBlock
            image={happywoman}
            alt={"vrouw die RijksBling ketting draagt"}
        >
            <h1>Welkom, {user.username}!</h1>
            <div>
                <p>je e-mailadres is: {user.email}</p>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
            <Button
                onClick={logout}
                text="Uitloggen"
            />

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
