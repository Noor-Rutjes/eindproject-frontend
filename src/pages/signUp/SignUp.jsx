import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";
import ContentBlock from "../../components/contentBlock/ContentBlock.jsx";
import geit from "../../assets/goat.png";

function SignUp() {
    const endpoint = "https://api.datavortex.nl/rijksbling/";
    // state voor het formulier
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`${endpoint}users`, {
                "username": username,
                "email": email,
                "password": password,
                "info": "testinfo",
                "authorities": [{ "authority": "USER" }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
                }
            });

            navigate('/signIn');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    function handleTogglePasswordVisibility() {
        setShowPassword(prevState => !prevState);
    }

    return (
        <ContentBlock
            title="Registreren"
            image={geit}
            alt={"geit die RijksBling ketting draagt"}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    E-mailadres:
                    <input
                        className="form-input-field"
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        className="form-input-field"
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <div className="password-container">
                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input
                            className="form-input-field"
                            type={showPassword ? "text" : "password"}  // Conditioneel type
                            id="password-field"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label htmlFor="show-password" className="checkbox-label">
                        <input
                            type="checkbox"
                            id="show-password"
                            checked={showPassword}
                            onChange={handleTogglePasswordVisibility}
                        />
                        Wachtwoord tonen
                    </label>
                </div>

                {error && <p className="error">Dit account bestaat al. Probeer een ander e-mail adres.</p>}
                <button
                    type="submit"
                    className="nav-button"
                    disabled={loading}
                >
                    Registreren
                </button>
            </form>

            <p>Heb je al een account? Je kunt <Link to="/signin">hier</Link> inloggen.</p>
        </ContentBlock>
    );
}

export default SignUp;
