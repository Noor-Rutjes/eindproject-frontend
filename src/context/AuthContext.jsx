import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const endpoint = "https://api.datavortex.nl/rijksbling";
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserData(decoded.sub, token);
    } else {
      setIsAuth({
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
    localStorage.clear();
    setIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });
    navigate('/');
  }

  async function fetchUserData(username, token, redirectUrl) {
    try {
      const result = await axios.get(`${endpoint}/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuth({
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
      console.error(e);
      setIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }

  const contextData = {
    ...isAuth,
    login,
    logout,
  };

  return (
      <AuthContext.Provider value={contextData}>
        {isAuth.status === 'done' ? children : <p>Loading...</p>}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;
