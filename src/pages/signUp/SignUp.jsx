import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../../components/authForm/AuthForm.jsx';
import ContentBlock from '../../components/contentBlock/ContentBlock.jsx';
import geit from "../../assets/goat.png";

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    // Define the form fields with validation rules
    const fields = [
        { name: 'username', type: 'text', placeholder: 'Gebruikersnaam', validation: { required: 'Gebruikersnaam is verplicht' }, ariaLabel: 'Gebruikersnaam' },
        { name: 'email', type: 'email', placeholder: 'E-mailadres', validation: { required: 'E-mailadres is verplicht', pattern: { value: /\S+@\S+\.\S+/, message: 'Voer een geldig e-mailadres in' } }, ariaLabel: 'E-mailadres' },
        { name: 'password', type: 'password', placeholder: 'Wachtwoord', validation: { required: 'Wachtwoord is verplicht', minLength: { value: 8, message: 'Wachtwoord moet minstens 8 tekens bevatten' } }, ariaLabel: 'Wachtwoord' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Bevestig wachtwoord', validation: { required: 'Bevestig wachtwoord is verplicht', validate: (value, context) => value === context.password || 'De wachtwoorden komen niet overeen' }, ariaLabel: 'Bevestig wachtwoord' }
    ];

    // Handle the sign-up form submission
    async function handleSignUp(data) {
        try {
            await axios.post('https://api.datavortex.nl/rijksbling/users', {
                username: data.username,
                email: data.email,
                password: data.password,
                authorities: [{ authority: "USER" }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
                }
            });
            navigate('/signin');
        } catch (e) {
            handleSignUpError(e);
        }
    }

    // Function to handle sign-up errors
    const handleSignUpError = (error) => {
        console.error('Fout bij registratie: ', error);
        if (error.response && error.response.data) {
            const errorMessage = error.response.data;
            if (error.response.status === 409) {
                if (errorMessage.includes('Username already exists')) {
                    setErrorMessage('Deze gebruikersnaam is reeds in gebruik.');
                    return;
                } else if (errorMessage.includes('Email already exists')) {
                    setErrorMessage('Dit e-mailadres is reeds in gebruik.');
                    return;
                }
            }
        }
        setErrorMessage('Registratie mislukt, probeer het opnieuw.');
    };

    // Clear the error message when the component is mounted
    useEffect(() => {
        setErrorMessage('');
    }, []);

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
                fields={fields}
                onInputChange={() => setErrorMessage('')}
            />
        </ContentBlock>
    );
}

export default SignUp;
