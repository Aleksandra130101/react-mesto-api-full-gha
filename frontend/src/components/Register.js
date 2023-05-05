import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register( { handleRegister } ) {

    const [formvalue, setFormvalue] = useState({
        email: '',
        password: ''
    });

    function handleDataNewUser(evt) {
        const { name, value } = evt.target;

        setFormvalue({
            ...formvalue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const { email, password } = formvalue;
        handleRegister(email, password);
    }

    return (
        <div className="authorize">
            <h2 className="authorize__title">Регистрация</h2>

            <form onSubmit={handleSubmit} className="authorize__form authorize__form_register">
                <input onChange={handleDataNewUser} id="email" value={formvalue.email} type="email" className="authorize__input authorize__input_email" name="email" placeholder="Email" required minLength="2" maxLength="40" />
                <span className="authorize__input-error email-error"></span>

                <input onChange={handleDataNewUser} id="password" value={formvalue.password} type="password" className="authorize__input authorize__input_password" name="password" placeholder="Пароль" required minLength="2" maxLength="40" />
                <span className="authorize__input-error password-error"></span>

                <button type="submit" className="authorize__button">Зарегистрироваться</button>
                <p className="authorize__signature ">Уже зарегистрированы? <Link to='/sign-in' className="authorize__signature authorize__signature_link">Войти</Link></p>
            </form>

        </div>
    )
}

export default Register;