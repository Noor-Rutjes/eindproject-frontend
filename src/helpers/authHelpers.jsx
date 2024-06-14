import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const endpoint = "https://api.datavortex.nl/rijksbling";

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

export function handleSignInError(e, setErrorMessage) {
    console.error('Fout bij inloggen: ', e);
    if (e.response && e.response.status === 400 && e.response.data === 'User not found') {
        setErrorMessage('De gebruikersnaam is onbekend.');
    } else if (e.response && e.response.status === 401 && e.response.data === 'Invalid username/password') {
        setErrorMessage('De combinatie van gebruikersnaam en wachtwoord is onjuist.');
    } else {
        setErrorMessage('Er is iets misgegaan. Probeer het later opnieuw.');
    }
}

export function handleSignUpError(e, setErrorMessage) {
    console.error('Fout bij registratie: ', e);
    if (e.response && e.response.data) {
        const errorMessage = e.response.data;
        if (e.response.status === 409) {
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
}

// Helper functie om te controleren of een token geldig is
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
