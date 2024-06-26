import React, {useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import happywoman from "../assets/contentBlock/happywoman.png";
import Button from "../components/button/Button.jsx";
import {AuthContext} from '../context/AuthContext';
import ContentBlock from "../components/contentBlock/ContentBlock.jsx";

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
            mediaType="image"
            mediaSrc={happywoman}
            alt={"vrouw die RijksBling ketting draagt"}
        >
            <h1>Welkom, {user.username}!</h1>
            <div>
                <p>je e-mailadres is: {user.email}</p>
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
            <Button
                type="button"
                onClick={logout}
                text="Uitloggen"
            />
        </ContentBlock>
    );
}

export default Profile;
