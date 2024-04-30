import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function SignIn() {
  const endpoint = "https://frontend-educational-backend.herokuapp.com/";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);

    try {
      const result = await axios.post(`${endpoint}api/auth/signin`, {
        "username": username,
        "password": password,
      });
      // log het resultaat in de console
      console.log(result.data);

      // geef de JWT token aan de login-functie van de context mee
      login(result.data.accessToken);

    } catch(e) {
      console.error(e);
      toggleError(true);
    }
  }

  return (
      <>
        <h1>Inloggen</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-field">
            Gebruikersnaam:
            <input
                type="username"
                id="username-field"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
                type="password"
                id="password-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">Combinatie van gebruikersnaam en wachtwoord is onjuist</p>}

          <button
              type="submit"
              className="form-button"
          >
            Inloggen
          </button>
        </form>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
      </>
  );
}

export default SignIn;