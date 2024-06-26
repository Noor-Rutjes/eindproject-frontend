import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const endpoint = "https://api.datavortex.nl/rijksbling";

// Authenticate user with provided credentials
export async function authenticateUser(data) {
    return await axios.post(`${endpoint}/users/authenticate`, {
        username: data.username,
        password: data.password,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': import.meta.env.VITE_BACKEND_API_KEY,
        }
    });
}

// Register a new user with provided information
export async function registerUser(data) {
    return await axios.post(`${endpoint}/users`, {
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
}

// Handle errors based on context and set error message accordingly
export function handleError(e, setErrorMessage, context) {
    console.error(`Fout bij ${context}: `, e);

    if (e.code === 'ERR_NETWORK') {
        setErrorMessage('Geen netwerkverbinding. Controleer uw internetverbinding en probeer het opnieuw.');
        return;
    }

    if (e.response) {
        const { status, data } = e.response;

        if (status === 400 && data === 'User not found') {
            setErrorMessage('De gebruikersnaam is onbekend.');
            return;
        }

        if (status === 401 && data === 'Invalid username/password') {
            setErrorMessage('De combinatie van gebruikersnaam en wachtwoord is onjuist.');
            return;
        }

        if (status === 409) {
            if (data.includes('Username already exists')) {
                setErrorMessage('Deze gebruikersnaam is reeds in gebruik.');
                return;
            }

            if (data.includes('Email already exists')) {
                setErrorMessage('Dit e-mailadres is reeds in gebruik.');
                return;
            }
        }
    }

    setErrorMessage('Er is iets misgegaan. Probeer het later opnieuw.');
}

// Check if a token is valid by decoding and comparing expiration time
export function isTokenValid(token) {
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
}