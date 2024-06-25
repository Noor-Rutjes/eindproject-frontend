import React from 'react';

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

export default LazyPainting;
