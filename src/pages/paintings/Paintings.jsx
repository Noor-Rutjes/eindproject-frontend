import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import './Paintings.css';
import Button from "../../components/button/Button.jsx";
import useFavorites from "../../helpers/useFavorites.jsx";
import { CATEGORIES, getCategoryName } from "../../constants/paintingCategories.jsx";
import { fetchPaintings } from "../../helpers/fetchPaintings.jsx";

// Component voor lazy loading van schilderijen
const LazyPainting = React.lazy(() => import('../../components/LazyPainting.jsx'));

function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [paintings, setPaintings] = useState([]);
    const { favorites, toggleFavorite } = useFavorites();
    const [category, setCategory] = useState(CATEGORIES[0]);
    const pageSize = 100;
    const page = 0;
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            toggleLoading(true);
            const result = await fetchPaintings(apiKey, page, pageSize, category);
            setPaintings(result.paintings);
            toggleError(false);
            console.log("Fetched paintings:", result.paintings);
        } catch (error) {
            console.error("Error fetching paintings:", error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }, [apiKey, page, pageSize, category]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const changeCategory = useCallback((newCategory) => {
        setCategory(newCategory);
    }, []);

    const paintingsList = useMemo(() => {
        return paintings.map((painting, index) => (
            <Suspense fallback={<div>Loading...</div>} key={painting.id}>
                <LazyPainting
                    painting={painting}
                    index={index}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                />
            </Suspense>
        ));
    }, [paintings, favorites, toggleFavorite]);

    return (
        <>
            <div className="general-container">
                <div id="category-button-container">
                    <div>
                        {CATEGORIES.map(category => (
                            <Button
                                type="button"
                                key={category}
                                onClick={() => changeCategory(category)}
                                text={getCategoryName(category)}
                            />
                        ))}
                    </div>
                    <div>
                        <p>
                            Klaar met selecteren? Ga naar de
                            <Link to="/necklace">
                                <Button type="button" text="Ketting" />
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="paintings-container">
                    {loading && <p>Loading...</p>}
                    {!loading && paintingsList}
                </div>
            </div>
        </>
    );
}

export default Paintings;
