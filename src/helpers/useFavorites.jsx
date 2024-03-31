// useFavorites.jsx
import { useState, useEffect } from 'react';

function useFavorites() {
    console.log("useFavorites function called");
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const toggleFavorite = (paintingId) => {
        if (favorites.includes(paintingId)) {
            setFavorites(favorites.filter(id => id !== paintingId));
        } else {
            setFavorites([...favorites, paintingId]);
        }
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites:', favorites);
    }, [favorites]);

    return { favorites, toggleFavorite }; // Voeg toggleFavorite toe aan het teruggegeven object
}

export default useFavorites;
