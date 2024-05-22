import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import bride from "../../assets/bride.png";
import ContentBlock from "../../components/contentBlock/ContentBlock.jsx";

function SignIn() {
    // const apiKeyBackend = import.meta.env.VITE_BACKEND_API_KEY;
    // console.log('API Key:', apiKeyBackend); // Voeg deze regel toe
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const {login} = useContext(AuthContext);

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.datavortex.nl/rijksbling/users/authenticate', {
                username: formData.username,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
                }
            });
            login(response.data.jwt);
        } catch (e) {
            console.error('Fout bij inloggen: ', e);
        }
    }

    return (
        <ContentBlock
            title="Inloggen"
            image={bride}
            alt={"bruid met ketting"}
        >

            <form onSubmit={handleFormSubmit}>
                <input
                    className="form-input-field"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Gebruikersnaam"
                />
                <input
                    className="form-input-field"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Wachtwoord"
                />
                <button type="submit" className='nav-button'>Inloggen</button>
                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </form>
        </ContentBlock>

    );
}

export default SignIn;
