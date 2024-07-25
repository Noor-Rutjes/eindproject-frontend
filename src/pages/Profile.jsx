import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from '../context/AuthContext.jsx';
import happywoman from "../assets/contentBlock/happywoman.png";
import Button from "../components/button/Button.jsx";
import ContentBlock from "../components/contentBlock/ContentBlock.jsx";

function Profile() {

    const {user, logout} = useContext(AuthContext);

    return (
        <ContentBlock
            mediaType="image"
            mediaSrc={happywoman}
            alt={"vrouw die RijksBling ketting draagt"}
            title={`Welkom, ${user.username}!`}
        >
            <section>
                <p>je e-mailadres is: {user.email}</p>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </section>
            <Button
                type="button"
                onClick={logout}
                text="Uitloggen"
            />
        </ContentBlock>
    );
}

export default Profile;
