import { handleFetch, fetchWithParams } from './apiHelpers';
import { CATEGORIES } from '../constants/paintingCategories';

// Fetch a list of paintings based on parameters
export async function fetchPaintings(apiKey, page, pageSize, category, signal) {
    const apiUrl = `https://www.rijksmuseum.nl/api/nl/usersets/${category}?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`;
    const data = await handleFetch(apiUrl, signal);

    return {
        paintings: data.userSet.setItems,
        totalResults: data.userSet.count
    };
}

// Fetch details of a specific painting
export async function fetchPaintingDetails(apiKey, objectNumber, signal) {
    const detailUrl = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}`;
    const params = {
        key: apiKey,
        imgonly: "True",
        q: objectNumber
    };

    const data = await fetchWithParams(detailUrl, params, signal);
    const paintingDetails = data.artObject;

    return {
        id: objectNumber,
        title: paintingDetails.title,
        artist: paintingDetails.principalOrFirstMaker,
        year: paintingDetails.dating.presentingDate,
        description: paintingDetails.description,
        characteristics: paintingDetails.physicalMedium,
        dimensions: paintingDetails.subTitle,
        image: paintingDetails.webImage.url,
    };
}

// Fetch a list of favorite paintings based on the user's favorites
export async function fetchFavoritePaintings(apiKey, favorites, page, pageSize, signal) {
    let favoritePaintings = [];
    for (const category of CATEGORIES) {
        const result = await fetchPaintings(apiKey, page, pageSize, category, signal);
        const filteredFavoritePaintings = result.paintings.filter(painting => favorites.includes(painting.id));
        favoritePaintings = favoritePaintings.concat(filteredFavoritePaintings);
    }
    return favoritePaintings;
}
