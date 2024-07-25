import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Authform.jsx';
import ContentBlock from '../components/contentBlock/ContentBlock.jsx';
import geit from "../assets/contentBlock/goat.png";
import { registerUser, handleError } from '../helpers/authHelpers';

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const fields = [
        { name: 'username', type: 'text', placeholder: 'Gebruikersnaam', validation: { required: 'Gebruikersnaam is verplicht', minLength: { value: 4, message: 'Gebruikersnaam moet minstens 4 tekens bevatten' } }, ariaLabel: 'Gebruikersnaam', autocomplete: 'username' },
        { name: 'email', type: 'email', placeholder: 'E-mailadres', validation: { required: 'E-mailadres is verplicht', pattern: { value: /\S+@\S+\.\S+/, message: 'Voer een geldig e-mailadres in' } }, ariaLabel: 'E-mailadres', autocomplete: 'email' },
        { name: 'password', type: 'password', placeholder: 'Wachtwoord', validation: { required: 'Wachtwoord is verplicht', minLength: { value: 8, message: 'Wachtwoord moet minstens 8 tekens bevatten' } }, ariaLabel: 'Wachtwoord', autocomplete: 'new-password' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Bevestig wachtwoord', validation: { required: 'Bevestig wachtwoord is verplicht', validate: (value, context) => value === context.password || 'De wachtwoorden komen niet overeen' }, ariaLabel: 'Bevestig wachtwoord', autocomplete: 'new-password' }
    ];

    async function handleSignUp(data) {
        try {
            await registerUser(data);
            navigate('/signin');
        } catch (e) {
            handleError(e, setErrorMessage, 'registreren');
        }
    }

    return (
        <ContentBlock
            mediaType="image"
            mediaSrc={geit}
            alt="Geit die RijksBling ketting draagt"
            title="Registreren"
        >
            <section>
                <AuthForm
                    onSubmit={handleSignUp}
                    linkTextBegin="Heb je al een account? Je kan "
                    linkTextEnd=" inloggen."
                    linkTo="/signin"
                    buttonText="Registreren"
                    errorMessage={errorMessage}
                    fields={fields}
                    onInputChange={() => setErrorMessage('')}
                />
            </section>
        </ContentBlock>
    );
}

export default SignUp;
