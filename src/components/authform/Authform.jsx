import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ onSubmit, title, linkTextBegin, linkTextEnd, linkTo, buttonText, errorMessage }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="auth-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        className="form-input-field"
                        type="text"
                        placeholder="Gebruikersnaam"
                        {...register('username', { required: true })}
                    />
                    {errors.username && <span className="error">Gebruikersnaam is verplicht</span>}
                </div>
                <div>
                    <input
                        className="form-input-field"
                        type="password"
                        placeholder="Wachtwoord"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    {errors.password && <span className="error">Wachtwoord moet minstens 6 tekens bevatten</span>}
                </div>
                {title === "Registreren" && (
                    <div>
                        <input
                            className="form-input-field"
                            type="email"
                            placeholder="E-mailadres"
                            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                        />
                        {errors.email && <span className="error">Voer een geldig e-mailadres in</span>}
                    </div>
                )}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <button type="submit" className='nav-button'>{buttonText}</button>
            </form>
            <p>{linkTextBegin} <Link to={linkTo}>hier</Link>{linkTextEnd}</p>

        </div>
    );
}

export default AuthForm;
