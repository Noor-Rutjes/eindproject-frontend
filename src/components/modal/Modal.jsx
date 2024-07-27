import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ show, onClose, painting }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (show) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                } else if (e.key === 'Escape') {
                    onClose();
                }
            }
        };

        if (show) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [show, onClose]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                role="dialog"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                tabIndex={-1}
                ref={modalRef}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close"></button>
                {painting && (
                    <article>
                        <section>
                            <h2 id="modal-title">{painting.title}</h2>
                            <p>{painting.artist}, {painting.year}</p>
                        </section>
                        <section id="modal-description">
                            <p>{painting.characteristics}, {painting.dimensions}</p>
                            <p>{painting.description}</p>
                        </section>
                        <figure>
                            <img src={painting.image} alt={painting.title} />
                        </figure>
                    </article>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    painting: PropTypes.shape({
        title: PropTypes.string,
        artist: PropTypes.string,
        year: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
    }),
};

export default Modal;
