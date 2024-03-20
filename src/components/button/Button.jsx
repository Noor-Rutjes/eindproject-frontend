import React from "react";
import './Button.css';

function Button({ onClick, disabled, text }) {
    return (
        <button type="button" className="nav-button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;
