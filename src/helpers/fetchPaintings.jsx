import { useEffect } from 'react';
import axios from 'axios';

export async function fetchPaintings(apiKey, page, pageSize) {
    const controller = new AbortController();

    try {
        const response = await axios.get(
            `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`,
            { signal: controller.signal }
        );
        return {
            paintings: response.data.userSet.setItems,
            totalResults: response.data.userSet.count
        };
    } catch (e) {
        if (axios.isCancel(e)) {
            console.error('Request is canceled...');
        } else {
            console.error(e);
        }
        return { paintings: [], totalResults: 0 };
    }
}

export function useFetchPaintings(apiKey, page, pageSize, setPaintings, setTotalResults, toggleLoading, toggleError) {
    useEffect(() => {
        const fetchData = async () => {
            toggleError(false);
            toggleLoading(true);

            const { paintings, totalResults } = await fetchPaintings(apiKey, page, pageSize);
            setPaintings(paintings);
            setTotalResults(totalResults);

            toggleLoading(false);
        };

        fetchData();

        return () => {};
    }, [apiKey, page, pageSize, setPaintings, setTotalResults, toggleLoading, toggleError]);
}
