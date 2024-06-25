// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
//
//
// function useFavorites() {
//     console.log("useFavorites function called");
//     const navigate = useNavigate();
//
//
//     const { isAuth } = useContext(AuthContext);
//     const [favorites, setFavorites] = useState(() => {
//         const storedFavorites = localStorage.getItem('favorites');
//         return storedFavorites ? JSON.parse(storedFavorites) : [];
//     });
//
//     const toggleFavorite = (paintingId) => {
//         if (!isAuth) {
//             console.log("User is not authenticated");
//             alert('Je moet ingelogd zijn om schilderijen te selecteren.');
//             navigate('/signIn');
//             return;
//         }
//
//         if (favorites.includes(paintingId)) {
//             setFavorites(favorites.filter(id => id !== paintingId));
//         } else {
//             setFavorites([...favorites, paintingId]);
//         }
//     };
//
//     useEffect(() => {
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//         console.log('Favorites:', favorites);
//     }, [favorites]);
//
//     return { favorites, toggleFavorite };
// }
//
// export default useFavorites;

import {useState, useEffect, useContext, useMemo, useCallback} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function useFavorites() {
    console.log("useFavorites function called");
    const navigate = useNavigate();

    const { isAuth } = useContext(AuthContext);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const toggleFavorite = useCallback((paintingId) => {
        if (!isAuth) {
            console.log("User is not authenticated");
            alert('Je moet ingelogd zijn om schilderijen te selecteren.');
            navigate('/signIn');
            return;
        }

        if (favorites.includes(paintingId)) {
            setFavorites(favorites.filter(id => id !== paintingId));
        } else {
            setFavorites([...favorites, paintingId]);
        }
    }, [favorites, isAuth, navigate]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites:', favorites);
    }, [favorites]);

    return useMemo(() => ({ favorites, toggleFavorite }), [favorites, toggleFavorite]);
}

export default useFavorites;
