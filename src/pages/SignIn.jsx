import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import AuthForm from '../components/Authform.jsx';
import ContentBlock from '../components/contentBlock/ContentBlock.jsx';
import bride from "../assets/bride.png";
import { authenticateUser, handleError } from '../helpers/authHelpers';

function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const fields = [
        { name: 'username', type: 'text', placeholder: 'Gebruikersnaam', validation: { required: 'Gebruikersnaam is verplicht' }, ariaLabel: 'Gebruikersnaam', autocomplete: 'username' },
        { name: 'password', type: 'password', placeholder: 'Wachtwoord', validation: { required: 'Wachtwoord is verplicht' }, ariaLabel: 'Wachtwoord', autocomplete: 'password' }
    ];

    async function handleSignIn(data) {
        try {
            const response = await authenticateUser(data);
            login(response.data.jwt);
            navigate('/');
        } catch (e) {
            handleError(e, setErrorMessage, 'inloggen');
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
                fields={fields}
            />
        </ContentBlock>
    );
}

export default SignIn;