import axios from 'axios';
import {CATEGORIES} from "../constants/paintingCategories.jsx";

export async function fetchPaintings(apiKey, page, pageSize, category) {
    console.log("fetchPaintings function called");
    const controller = new AbortController();

    try {
        let apiUrl = `https://www.rijksmuseum.nl/api/nl/usersets/${category}?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`;
        const { data: { userSet } } = await axios.get(apiUrl, { signal: controller.signal });
        let paintings = userSet.setItems;

        return {
            paintings: paintings,
            totalResults: userSet.count
        };
    } catch (error) {
        console.error("Error fetching paintings:", error);
        throw error;
    }
}


export async function fetchFavoritePaintings(apiKey, favorites, page, pageSize) {
    console.log("Fetching favorite paintings...");
    let favoritePaintings = [];

    try {
        for (let category of CATEGORIES) {
            const result = await fetchPaintings(apiKey, page, pageSize, category);
            const filteredFavoritePaintings = result.paintings.filter(painting => favorites.includes(painting.id));
            favoritePaintings = favoritePaintings.concat(filteredFavoritePaintings);
        }

        return favoritePaintings;    } catch (error) {
        console.error("Error fetching paintings:", error);
        throw error;
    }
}