import axios from 'axios';

export async function fetchPaintings(apiKey, page, pageSize, favorites = []) {
    console.log("fetchPaintings function called");
    const controller = new AbortController();

    try {
        const response = await axios.get(
            `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`,
            { signal: controller.signal }
        );

        // Filter alleen favoriete schilderijen als er favorieten zijn
        let paintings = response.data.userSet.setItems;
        if (favorites.length > 0) {
            paintings = paintings.filter(painting => favorites.includes(painting.id));
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
