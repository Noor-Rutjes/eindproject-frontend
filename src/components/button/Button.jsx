import React from "react";
import './Button.css';

function Button({ onClick, disabled, text, id }) {
    return (
        <button type="button" className="nav-button" id={id} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;
