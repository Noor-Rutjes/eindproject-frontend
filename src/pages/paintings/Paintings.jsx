import React, { useState, useEffect } from 'react';
import useFavorites from "../../helpers/useFavorites.jsx";
import { fetchPaintings } from "../../helpers/fetchPaintings.jsx";
import { CATEGORIES, getCategoryName } from "../../constants/paintingCategories.jsx";
import Button from "../../components/button/Button.jsx";
import './Paintings.css';

function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites, toggleFavorite } = useFavorites();
    const [paintings, setPaintings] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const pageSize = 100;
    const page = 0;
    const [category, setCategory] = useState(CATEGORIES[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleLoading(true);
                // Fetch paintings from the API
                const result = await fetchPaintings(apiKey, page, pageSize, category);
                // Update the state of paintings
                setPaintings(result.paintings);
                toggleError(false);
                console.log("Fetched paintings:", result.paintings);
            } catch (error) {
                console.error("Error fetching paintings:", error);
                // Set error status in case of error while fetching paintings
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        };

        // Fetch paintings when category, page, or pageSize changes
        fetchData();
    }, [apiKey, page, pageSize, category]);

    // Function to change category
    const changeCategory = (newCategory) => {
        // Update the current category
        setCategory(newCategory);
    }

    return (
        <>
            <div className="general-container">
                <div id="category-button-container">
                    {/* Generate buttons for all categories */}
                    {CATEGORIES.map(category => (
                        <Button
                            key={category}
                            onClick={() => changeCategory(category)}
                            text={getCategoryName(category)} // Use getCategoryName function to get the category name
                        />
                    ))}
                </div>
                <div className="paintings-container">
                    {loading && <p>Loading...</p>}
                    {/* Display the paintings once they are loaded */}
                    {!loading && paintings.map((painting, index) => (
                        <div
                            key={painting.id}
                            id={`painting-${index}`}
                            className="painting-image-square"
                        >
                            <img
                                className="painting-square"
                                src={painting.image.cdnUrl}
                                alt="painting"
                            />
                            <div
                                className="favorite-heart"
                                onClick={() => toggleFavorite(painting.id)}
                            >
                                {/* Show a red heart if the painting is a favorite */}
                                {favorites.includes(painting.id) ? '❤️' : '🤍'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Paintings;
