import React from 'react';
import PropTypes from "prop-types";

function LazyPainting({ painting, index, toggleFavorite, favorites, onClick }) {

    return (
        <div
            id={`painting-${index}`}
            className="painting-image-square"
            onClick={onClick} // Ensure the click event is passed down correctly
        >
            <img
                className="painting-square"
                src={painting.image.cdnUrl}
                alt="painting"
            />
            <div
                className="favorite-heart"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick on the container
                    toggleFavorite(painting.id);
                }}
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
        objectNumber: PropTypes.string.isRequired, // Make sure this prop type is added
        image: PropTypes.shape({
            cdnUrl: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired, // Add this prop type
};

export default LazyPainting;
