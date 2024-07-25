import { useState, useEffect, useCallback } from 'react';
import { fetchPaintings, fetchFavoritePaintings } from '../helpers/fetchPaintings';

function useFetchPaintings(apiKey, favorites, page, pageSize, category, isFavoriteFetch) {
    const [paintings, setPaintings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (controller) => {
        try {
            setLoading(true);
            let result;
            if (isFavoriteFetch) {
                result = await fetchFavoritePaintings(apiKey, favorites, page, pageSize, controller.signal);
            } else {
                result = await fetchPaintings(apiKey, page, pageSize, category, controller.signal);
            }
            setPaintings(result.paintings || result);
            setError(false);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching paintings:", error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [apiKey, page, pageSize, category, isFavoriteFetch]); // favorites verwijderd uit dependencies

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller);

        return () => {
            controller.abort();
        };
    }, [fetchData]);

    return { paintings, error, loading };
}

export default useFetchPaintings;
