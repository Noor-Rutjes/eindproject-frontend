import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";
import ContentBlock from "../../components/contentBlock/ContentBlock.jsx";
import geit from "../../assets/geit.png";
import Button from "../../components/button/Button.jsx";

function SignUp() {
  const endpoint = "https://frontend-educational-backend.herokuapp.com/";
  // state voor het formulier
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state voor functionaliteit
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);
    toggleLoading(true);

    try {
      await axios.post(`${endpoint}api/auth/signup`, {
        "email": email,
        "password": password,
        "username": username,
        "role": ["user"],
      });

      // Let op: omdat we geen axios Canceltoken gebruiken zul je hier een memory-leak melding krijgen.
      // Om te zien hoe je een canceltoken implementeerd kun je de bonus-branch bekijken!

      // als alles goed gegaan is, linken we dyoor naar de login-pagina
      navigate('/signIn');
    } catch(e) {
      console.error(e);
      toggleError(true);
    }

    toggleLoading(false);
  }

  return (
      <ContentBlock
          title="Registreren"
          image={geit}
          alt={"geit met ketting"}
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

          <label htmlFor="password-field">
            Wachtwoord:
            <input
                className="form-input-field"
                type="password"
                id="password-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">Dit account bestaat al. Probeer een ander e-mail adres.</p>}
          {/*<button*/}
          {/*    type="submit"*/}
          {/*    className="form-button"*/}
          {/*    disabled={loading}*/}
          {/*>*/}
          {/*  Registreren*/}
          {/*</button>*/}

        <Button
            type="submit"
            text={"Registreren"}
        />


      </form>

        <p>Heb je al een account? Je kunt <Link to="/signin">hier</Link> inloggen.</p>
      </ContentBlock>
  );
}

export default SignUp;