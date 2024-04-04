import { useState, useEffect } from 'react';

function useFavorites() {
    console.log("useFavorites function called");

    // State is een soort globale variabele waar alle elementen in ons component bij kunnen.
    // De data staat op één plek en wordt alleen daar vandaan uitgelezen of gewijzigd.
    // Zodra we onze applicatie van actie willen voorzien, zullen we State gebruiken.
    // We slaan data die verandert op in State. Om waardes naar de State te schrijven en uit te lezen,
    // gebruiken we speciale methodes genaamd hooks.
    // Wanneer we deze methode aanroepen, geven we altijd een initiële waarde mee;
    // hiermee geven we aan met welke data we willen beginnen (voorbeelden: lege string, 0, lege array).
    // iedere keer als we de useState-methode aanroepen, krijgen we een array terug met twee waardes die we meteen destructuren.
    // De eerste waarde is de key van het State object waarin er de informatie gaan opslaan (in dit geval image).
    // De tweede waarde is de speciale setter-methode die gelinkt is aan de key, zodat we de gegevens die erin staan kunnen aanpassen (setImage).
    // Het is conventie om de bijbehorende methode altijd dezelfde naam te geven als de key, maar in de actieve vorm: set<naam van de State key>
    // of toggle<naam van de State key>. Vervolgens kan je overal in het component de naam van de key aanspreken en de setter-methode gebruiken om deze waarde aan te passen.

    // Gebruik de useState-hook om een state-variabele favorites te maken. Deze state-variabele zal de lijst van favoriete schilderijen bijhouden.
    // De initiële waarde van favorites wordt ingesteld door te controleren of er eerder opgeslagen favorieten in de localStorage zijn.
    // Als dat het geval is, worden ze geparseerd vanuit de localStorage. Zo niet, dan wordt een lege array ingesteld als de initiële waarde.

    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    // Definieer een functie genaamd toggleFavorite die wordt gebruikt om een schilderij toe te voegen aan of te verwijderen uit de lijst van favorieten.
    // Deze functie accepteert een paintingId als argument.

    // Binnen toggleFavorite wordt gecontroleerd of het schilderij al in de lijst van favorieten staat (favorites).
    // Als het schilderij al favoriet is, wordt het uit de lijst verwijderd door de setFavorites-functie te gebruiken in combinatie met filter.
    // Als het schilderij nog geen favoriet is, wordt het toegevoegd aan de lijst met behulp van de setFavorites-functie in combinatie met de spread-operator (...) om een nieuwe array te maken.

    const toggleFavorite = (paintingId) => {
        if (favorites.includes(paintingId)) {
            setFavorites(favorites.filter(id => id !== paintingId));
        } else {
            setFavorites([...favorites, paintingId]);
        }
    };

    // Gebruik de useEffect-hook om de favorites-state te bewaken.
    // Telkens wanneer deze state verandert, wordt de localStorage bijgewerkt met de bijgewerkte lijst van favorieten.

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites:', favorites);
    }, [favorites]);

    // Retourneer een object met daarin zowel de lijst van favorieten (favorites) als de toggleFavorite-functie.

    return { favorites, toggleFavorite };
}

export default useFavorites;
