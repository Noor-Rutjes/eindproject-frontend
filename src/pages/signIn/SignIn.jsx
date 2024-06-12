import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/authForm/AuthForm.jsx';
import ContentBlock from '../../components/contentBlock/ContentBlock.jsx';
import bride from "../../assets/bride.png";

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
            if (e.response && e.response.status === 400 && e.response.data === 'User not found') {
                setErrorMessage('De gebruikersnaam is onbekend.');
            } else if  (e.response && e.response.status === 401 && e.response.data === 'Invalid username/password') {
                setErrorMessage('De combinatie van gebruikersnaam en wachtwoord is onjuist.');
            } else {
                setErrorMessage('Er is iets misgegaan. Probeer het later opnieuw.');
            }
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
                linkTextBegin="Heb je nog geen account? Je kan je "
                linkTextEnd=" registreren."
                linkTo="/signup"
                buttonText="Inloggen"
                errorMessage={errorMessage}
                fields={[
                    { name: 'username', type: 'text', placeholder: 'Gebruikersnaam', validation: { required: 'Gebruikersnaam is verplicht' } },
                    { name: 'password', type: 'password', placeholder: 'Wachtwoord', validation: { required: 'Wachtwoord is verplicht' } }
                ]}
            />
        </ContentBlock>
    );
}

export default SignIn;