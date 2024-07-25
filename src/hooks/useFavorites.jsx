import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function useFavorites() {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const toggleFavorite = useCallback((paintingId) => {
        if (!isAuth) {
            alert('Je moet ingelogd zijn om schilderijen te selecteren.');
            navigate('/signIn');
            return;
        }

        setFavorites(prevFavorites => {
            if (prevFavorites.includes(paintingId)) {
                return prevFavorites.filter(id => id !== paintingId);
            } else {
                return [...prevFavorites, paintingId];
            }
        });
    }, [isAuth, navigate]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return useMemo(() => ({ favorites, toggleFavorite }), [favorites, toggleFavorite]);
}

export default useFavorites;
