import React from "react";
import PropTypes from 'prop-types';
import './Button.css';

const Button = React.forwardRef(({ type, onClick, disabled, text, id, className, children }, ref) => {
    return (
        <button
            type={type}
            className={`button ${className}`}
            id={id}
            onClick={onClick}
            disabled={disabled}
            ref={ref}
        >
            {text}
            {children}
        </button>
    );
});

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
    id: '',
    className: '',
    text: '',
};

Button.displayName = 'Button';

export default Button;
