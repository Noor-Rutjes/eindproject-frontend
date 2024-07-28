import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Button from "../button/Button.jsx";

const Modal = ({ show, onClose, painting }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent default behavior for ArrowDown and ArrowUp keys, but allow Escape key to close the modal
            if (show) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                } else if (e.key === 'Escape') {
                    onClose();
                }
            }
        };

        if (show) {
            // Disable scrolling when the modal is open
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
            if (modalRef.current) {
                modalRef.current.focus(); // Focus on the modal when it is opened
            }
        } else {
            // Enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset body overflow and remove event listener
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [show, onClose]);

    if (!show) {
        return null; // Return nothing if the modal is not shown
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
                <Button
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                />
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
    show: PropTypes.bool.isRequired, // Whether the modal is visible
    onClose: PropTypes.func.isRequired, // Function to close the modal
    painting: PropTypes.shape({
        title: PropTypes.string,
        artist: PropTypes.string,
        year: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
    }), // Painting object with optional properties
};

export default Modal;
