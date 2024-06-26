import React from 'react';
import PropTypes from "prop-types";

function LazyPainting({ painting, index, toggleFavorite, favorites }) {
    return (
        <div
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
                {favorites.includes(painting.id) ? '❤️' : '🤍'}
            </div>
        </div>
    );
}

// PropTypes for typechecking
LazyPainting.propTypes = {
    painting: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.shape({
            cdnUrl: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LazyPainting;
