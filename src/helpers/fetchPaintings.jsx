import axios from 'axios';
import { CATEGORIES } from '../constants/paintingCategories';

export async function fetchPaintings(apiKey, page, pageSize, category) {
    const controller = new AbortController();

    try {
        const apiUrl = `https://www.rijksmuseum.nl/api/nl/usersets/${category}?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`;
        const { data: { userSet } } = await axios.get(apiUrl, { signal: controller.signal });
        const paintings = userSet.setItems;

        return {
            paintings,
            totalResults: userSet.count
        };
    } catch (error) {
        console.error('Error fetching paintings:', error);
        throw error;
    }
}

export async function fetchFavoritePaintings(apiKey, favorites, page, pageSize) {
    let favoritePaintings = [];

    try {
        for (const category of CATEGORIES) {
            const result = await fetchPaintings(apiKey, page, pageSize, category);
            const filteredFavoritePaintings = result.paintings.filter(painting => favorites.includes(painting.id));
            favoritePaintings = favoritePaintings.concat(filteredFavoritePaintings);
        }

        return favoritePaintings;
    } catch (error) {
        console.error('Error fetching favorite paintings:', error);
        throw error;
    }
}
