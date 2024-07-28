import React, { useState, useCallback, useMemo, useEffect, Suspense, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Paintings.css';
import Button from '../../components/button/Button.jsx';
import { CATEGORIES, getCategoryName } from '../../constants/paintingCategories.jsx';
import Modal from '../../components/modal/Modal.jsx';
import { fetchPaintings, fetchPaintingDetails } from '../../helpers/fetchPaintings';
import { AuthContext } from '../../context/AuthContext';

const LazyPainting = React.lazy(() => import('../../components/LazyPainting.jsx'));

function Paintings() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [category, setCategory] = useState(CATEGORIES[0]);
    const pageSize = 100;
    const page = 0;
    const [selectedPainting, setSelectedPainting] = useState(null);
    const [paintingDetails, setPaintingDetails] = useState(null);
    const [paintings, setPaintings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Fetch paintings based on the current category and page
    const fetchData = useCallback(async (controller) => {
        try {
            setLoading(true);
            const result = await fetchPaintings(apiKey, page, pageSize, category, controller.signal);
            setPaintings(result.paintings || []);
            setError(false);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching paintings:", error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [apiKey, page, pageSize, category]);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller);

        return () => {
            controller.abort(); // Cleanup the abort controller when component unmounts
        };
    }, [fetchData]);

    // Change the current category of paintings
    const changeCategory = useCallback((newCategory) => {
        setCategory(newCategory);
    }, []);

    // Toggle a painting between favorite and non-favorite
    const handleToggleFavorite = useCallback((paintingId) => {
        if (!isAuth) {
            alert('Je moet ingelogd zijn om schilderijen te selecteren.');
            navigate('/signIn');
            return;
        }

        setFavorites(prevFavorites => {
            const newFavorites = prevFavorites.includes(paintingId)
                ? prevFavorites.filter(id => id !== paintingId)
                : [...prevFavorites, paintingId];

            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    }, [isAuth, navigate]);

    // Open a modal to show painting details
    const openModal = useCallback(async (painting) => {
        setSelectedPainting(painting);
        try {
            const details = await fetchPaintingDetails(apiKey, painting.objectNumber);
            setPaintingDetails(details);
        } catch (error) {
            console.error('Error fetching painting details:', error);
        }
    }, [apiKey]);

    // Close the modal and clear painting details
    const closeModal = () => {
        setSelectedPainting(null);
        setPaintingDetails(null);
    };

    // Create a list of paintings with lazy loading
    const paintingsList = useMemo(() => {
        return paintings.map((painting, index) => (
            <Suspense fallback={<div>Loading...</div>} key={painting.objectNumber}>
                <LazyPainting
                    painting={painting}
                    index={index}
                    toggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                    onClick={() => openModal(painting)}
                />
            </Suspense>
        ));
    }, [paintings, favorites, handleToggleFavorite, openModal]);

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
                    {error && <div className="error">Er is een fout opgetreden bij het ophalen van de schilderijen.</div>}
                    {!loading && paintingsList}
                </section>
            </section>
            {paintingDetails && (
                <Modal show={!!selectedPainting} onClose={closeModal} painting={paintingDetails} />
            )}
        </>
    );
}

export default Paintings;
