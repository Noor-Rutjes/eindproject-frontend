import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../../components/authForm/AuthForm.jsx';
import ContentBlock from '../../components/contentBlock/ContentBlock.jsx';
import geit from "../../assets/goat.png";
import './SignUp.css';

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSignUp(data) {
        try {
            await axios.post('https://api.datavortex.nl/rijksbling/users', {
                username: data.username,
                email: data.email,
                password: data.password,
                info: "testinfo",
                authorities: [{ authority: "USER" }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
                }
            });
            navigate('/signin');
        } catch (e) {
            console.error('Fout bij registreren: ', e);
            setErrorMessage('Registratie mislukt, probeer het opnieuw.');
        }
    }

    return (
        <ContentBlock
            mediaType="image"
            mediaSrc={geit}
            alt={"geit die RijksBling ketting draagt"}
        >
            <AuthForm
                onSubmit={handleSignUp}
                title="Registreren"
                linkTextBegin="Heb je al een account? Je kan "
                linkTextEnd=" inloggen."
                linkTo="/signin"
                buttonText="Registreren"
                errorMessage={errorMessage}
            />
        </ContentBlock>
    );
}

export default SignUp;
