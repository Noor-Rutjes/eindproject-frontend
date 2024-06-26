import React from "react";
import PropTypes from 'prop-types';
import './Button.css';

function Button({ type, onClick, disabled, text, id }) {
    return (
        <button type={type} className="button" id={id} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

// Adding PropTypes for typechecking
Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    id: PropTypes.string,
};

// Setting default props
Button.defaultProps = {
    type: 'button',
    disabled: false,
    id: '',
};

export default Button;
