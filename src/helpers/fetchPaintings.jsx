import axios from 'axios';
import { CATEGORIES } from '../constants/paintingCategories';

async function handleFetch(url, signal) {
    try {
        const response = await axios.get(url, { signal });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function fetchPaintings(apiKey, page, pageSize, category, signal) {
    const apiUrl = `https://www.rijksmuseum.nl/api/nl/usersets/${category}?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`;
    const data = await handleFetch(apiUrl, signal);

    return {
        paintings: data.userSet.setItems,
        totalResults: data.userSet.count
    };
}

export async function fetchPaintingDetails(apiKey, objectNumber, signal) {
    const detailUrl = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}`;
    const details = await axios.get(detailUrl, {
        params: {
            key: apiKey,
            imgonly: "True",
            q: objectNumber
        },
        signal
    });

    const paintingDetails = details.data.artObject;

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

export async function fetchFavoritePaintings(apiKey, favorites, page, pageSize, signal) {
    let favoritePaintings = [];
    for (const category of CATEGORIES) {
        const result = await fetchPaintings(apiKey, page, pageSize, category, signal);
        const filteredFavoritePaintings = result.paintings.filter(painting => favorites.includes(painting.id));
        favoritePaintings = favoritePaintings.concat(filteredFavoritePaintings);
    }
    return favoritePaintings;
}
