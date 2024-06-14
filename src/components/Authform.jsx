import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from "./button/Button.jsx";

function AuthForm({ onSubmit, title, linkTextBegin, linkTextEnd, linkTo, buttonText, errorMessage, fields, onInputChange }) {
    const { register, handleSubmit, formState: { errors }, getValues, setValue, trigger } = useForm();

    // This is an extra function to validate fields when the Enter key is pressed
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            // Explicitly trigger validation for all fields
            const fieldNames = fields.map(field => field.name);
            for (const name of fieldNames) {
                await trigger(name); // Validate each field individually
            }
        }
    };

    return (
        <div className="auth-form">
            <h2>{title}</h2>
            {/* Form that is submitted with handleSubmit, which calls onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
                {fields.map(({ name, type, placeholder, validation, ariaLabel, autocomplete }) => (
                    <div key={name}>
                        <input
                            className="form-input-field"
                            type={type}
                            placeholder={placeholder}
                            aria-label={ariaLabel}
                            {...register(name, {
                                ...validation,
                                // Execute custom validation function if it exists
                                validate: validation.validate ? value => validation.validate(value, getValues()) : undefined,
                            })}
                            // Check if onInputChange is passed before calling it
                            onChange={e => {
                                if (onInputChange) {
                                    onInputChange(e);
                                }
                                // Explicitly update the value
                                setValue(name, e.target.value);
                            }}
                            autoComplete={autocomplete}
                        />
                        {/* Show error message if it exists for the field */}
                        {errors[name] && <span className="error">{errors[name].message}</span>}
                    </div>
                ))}
                {/* Show general error message if it exists */}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <Button type="submit" text={buttonText} />
            </form>
            <p>{linkTextBegin} <Link to={linkTo}>hier</Link>{linkTextEnd}</p>
        </div>
    );
}

export default AuthForm;
