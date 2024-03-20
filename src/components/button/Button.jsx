import './Button.css';

function Button({clickHandler, disabled, type = "button"}) {
    return (
        <button
            type={type}
            className="nav-button"
            onClick={clickHandler}
            disabled={disabled}
        >
        </button>
    );
}

export default Button;