import axios from 'axios';

export async function fetchPaintings(apiKey, page, pageSize, category, favorites = []) {
    console.log("fetchPaintings function called");
    const controller = new AbortController();

    try {
        let apiUrl = `https://www.rijksmuseum.nl/api/nl/usersets/${category}?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`;

        const response = await axios.get(apiUrl, { signal: controller.signal });
        console.log("response in fetchPaintings: ", response);

        let paintings = response.data.userSet.setItems;

        if (favorites.length > 0) {
            paintings = paintings.filter(painting => favorites.includes(painting.id));
            console.log("filtered favorite paintings in fetchPaintings: ", paintings);
        }

        return {
            paintings: paintings,
            totalResults: response.data.userSet.count
        };
    } catch (error) {
        console.error("Error fetching paintings:", error);
        return { paintings: [], totalResults: 0 };
    }
}
