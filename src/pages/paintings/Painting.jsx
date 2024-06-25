import React from 'react';

function Painting({ painting, isFavorite, toggleFavorite }) {
    return (
        <>
            <img className="painting-square" src={painting.image.cdnUrl} alt="painting" />
            <div className="favorite-heart" onClick={() => toggleFavorite(painting.id)}>
                {isFavorite ? '❤️' : '🤍'}
            </div>
        </>
    );
}

export default Painting;
