import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { isTokenValid } from '../helpers/authHelpers.jsx';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const endpoint = "https://api.datavortex.nl/rijksbling";
  const [authState, setAuthState] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenValid(token)) {
        const decoded = jwtDecode(token);
        fetchUserData(decoded.sub, token);
      } else {
        handleSessionExpiry();
      }
    } else {
      setAuthState({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, []);

  async function login(JWT) {
    localStorage.setItem('token', JWT);
    const decoded = jwtDecode(JWT);
    await fetchUserData(decoded.sub, JWT, '/profile');
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setAuthState({
      isAuth: false,
      user: null,
      status: 'done',
    });
    navigate('/signIn');
  }

  async function fetchUserData(username, token, redirectUrl) {
    try {
      const result = await axios.get(`${endpoint}/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthState({
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
        },
        status: 'done',
      });
      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (e) {
      console.error('Error fetching user data:', e);
      handleSessionExpiry();
    }
  }

  function handleSessionExpiry() {
    logout();
    alert('Je sessie is verlopen. Log opnieuw in om verder te gaan.');
  }

  const contextData = {
    ...authState,
    login,
    logout,
  };

  return (
      <AuthContext.Provider value={contextData}>
        {authState.status === 'done' ? children : <p>Loading...</p>}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;
