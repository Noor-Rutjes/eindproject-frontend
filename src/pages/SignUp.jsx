import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Authform.jsx';
import ContentBlock from '../components/contentBlock/ContentBlock.jsx';
import geit from "../assets/goat.png";
import { registerUser, handleSignUpError } from '../helpers/authHelpers.jsx';

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const fields = [
        { name: 'username', type: 'text', placeholder: 'Gebruikersnaam', validation: { required: 'Gebruikersnaam is verplicht' }, ariaLabel: 'Gebruikersnaam', autocomplete: 'username' },
        { name: 'email', type: 'email', placeholder: 'E-mailadres', validation: { required: 'E-mailadres is verplicht', pattern: { value: /\S+@\S+\.\S+/, message: 'Voer een geldig e-mailadres in' } }, ariaLabel: 'E-mailadres', autocomplete: 'email' },
        { name: 'password', type: 'password', placeholder: 'Wachtwoord', validation: { required: 'Wachtwoord is verplicht', minLength: { value: 8, message: 'Wachtwoord moet minstens 8 tekens bevatten' } }, ariaLabel: 'Wachtwoord', autocomplete: 'new-password' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Bevestig wachtwoord', validation: { required: 'Bevestig wachtwoord is verplicht', validate: (value, context) => value === context.password || 'De wachtwoorden komen niet overeen' }, ariaLabel: 'Bevestig wachtwoord', autocomplete: 'new-password' }
    ];

    async function handleSignUp(data) {
        try {
            await registerUser(data);
            navigate('/signin');
        } catch (e) {
            handleSignUpError(e, setErrorMessage);
        }
    }

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
