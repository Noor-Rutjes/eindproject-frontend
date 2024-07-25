import { useState, useEffect, useCallback } from 'react';
import { fetchFavoritePaintings } from '../helpers/fetchPaintings';

function useFetchFavoritePaintings(apiKey, favorites) {
    const [favoritePaintings, setFavoritePaintings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const page = 0;
    const pageSize = 100;

    const fetchFavoritePaintingsHelper = useCallback(async (controller) => {
        try {
            setLoading(true);
            const result = await fetchFavoritePaintings(apiKey, favorites, page, pageSize, controller.signal);
            setFavoritePaintings(result);
            setError(false);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching favorite paintings:", error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [apiKey, favorites, page, pageSize]);

    useEffect(() => {
        const controller = new AbortController();
        fetchFavoritePaintingsHelper(controller);

        return () => {
            controller.abort();
        };
    }, [fetchFavoritePaintingsHelper]);

    return { favoritePaintings, error, loading };
}

export default useFetchFavoritePaintings;
