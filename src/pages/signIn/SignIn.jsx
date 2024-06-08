import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../../components/authForm/AuthForm.jsx';
import { AuthContext } from '../../context/AuthContext';
import ContentBlock from '../../components/contentBlock/ContentBlock.jsx';
import bride from "../../assets/bride.png";
import './SignIn.css';

function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSignIn(data) {
        try {
            const response = await axios.post('https://api.datavortex.nl/rijksbling/users/authenticate', {
                username: data.username,
                password: data.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
                }
            });
            login(response.data.jwt);
            navigate('/');
        } catch (e) {
            console.error('Fout bij inloggen: ', e);
            setErrorMessage('Gebruikersnaam en wachtwoord komen niet overeen.');
        }
    }

    return (
        <ContentBlock
            mediaType="image"
            mediaSrc={bride}
            alt={"bruid die RijksBling ketting draagt"}
        >
            <AuthForm
                onSubmit={handleSignIn}
                title="Inloggen"
                redirectPath="/signup"
                linkTextBegin="Heb je nog geen account? Je kan je "
                linkTextEnd=" registreren."
                linkTo="/signup"
                buttonText="Inloggen"
                errorMessage={errorMessage}
            />
        </ContentBlock>
    );
}

export default SignIn;
