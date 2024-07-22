import React from "react";
import PropTypes from 'prop-types';
import './Button.css';

const Button = React.forwardRef(({ type, onClick, disabled, text, id }, ref) => {
    return (
        <button type={type} className="button" id={id} onClick={onClick} disabled={disabled} ref={ref}>
            {text}
        </button>
    );
});

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

// Adding displayName for better debugging (and to satisfy ESLint)
Button.displayName = 'Button';

export default Button;
