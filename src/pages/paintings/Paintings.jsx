import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import './Paintings.css';
import Button from '../../components/button/Button.jsx';
import useFavorites from '../../hooks/useFavorites';
import { CATEGORIES, getCategoryName } from '../../constants/paintingCategories.jsx';
import useFetchPaintings from '../../hooks/useFetchPaintings';

const LazyPainting = React.lazy(() => import('../../components/LazyPainting.jsx'));

function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { favorites, toggleFavorite } = useFavorites();
    const [category, setCategory] = useState(CATEGORIES[0]);
    const pageSize = 100;
    const page = 0;

    const { paintings, error, loading } = useFetchPaintings(apiKey, favorites, page, pageSize, category, false);

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
            <section className="general-container">
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
                <section className="paintings-container">
                    {loading && <div className="spinner">Loading...</div>}
                    {!loading && paintingsList}
                </section>
            </section>
        </>
    );
}

export default Paintings;
