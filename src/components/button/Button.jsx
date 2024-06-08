import React from "react";
import './Button.css';

function Button({ type, onClick, disabled, text, id }) {
    return (
        <button type={type} className="nav-button" id={id} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;
