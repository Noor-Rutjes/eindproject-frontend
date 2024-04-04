import axios from 'axios';

export async function fetchPaintings(apiKey, page, pageSize, favorites = []) {
    console.log("fetchPaintings function called");
    const controller = new AbortController();

    try {
        const response = await axios.get(
            `https://www.rijksmuseum.nl/api/nl/usersets/4515733-bloemen?key=${apiKey}&format=json&page=${page}&pageSize=${pageSize}`,
            { signal: controller.signal }
        );

        let paintings = response.data.userSet.setItems;

        // De ontvangen gegevens worden gecontroleerd op favoriete schilderijen als favorites niet leeg is.
        // Als er favoriete schilderijen zijn opgegeven, worden alleen de schilderijen behouden die overeenkomen met de schilderij-ID's in de favorites array.

        if (favorites.length > 0) {
            paintings = paintings.filter(painting => favorites.includes(painting.id));
        }

        // Het resultaat wordt geretourneerd als een object met twee eigenschappen:
        // paintings: De array van schilderijen die zijn opgehaald van de API (gefilterd op favorieten indien nodig).
        // totalResults: Het totale aantal resultaten beschikbaar in de gebruikerset van de Rijksmuseum API.

        return {
            paintings: paintings,
            totalResults: response.data.userSet.count
        };
    } catch (error) {
        console.error("Error fetching paintings:", error);
        return { paintings: [], totalResults: 0 };
    }
}
