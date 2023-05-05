import React, { useState } from 'react';

function Login({ handleLogin }) {


    const [formvalue, setFormvalue] = useState({
        email: '',
        password: ''
    })

    function handleDataUser(evt) {
        const { name, value } = evt.target;

        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = formvalue;
        if (!email || !password) {
            return
        }
        handleLogin(email, password)
            .then(() => {
                setFormvalue({ email: '', password: '' });
            })
    }

    return (
        <div className="authorize">
            <h2 className="authorize__title">Вход</h2>

            <form onSubmit={handleSubmit} className="authorize__form">
                <input onChange={handleDataUser} id="emailAuthorize" type="email" value={formvalue.email} className="authorize__input authorize__input_email" name="email" placeholder="Email" required minLength="2" maxLength="40" />
                <span className="authorize__input-error emailAuthorize-error"></span>

                <input onChange={handleDataUser} id="passwordAuthorize" type="password" value={formvalue.password} className="authorize__input authorize__input_password" name="password" placeholder="Пароль" required minLength="2" maxLength="40" />
                <span className="authorize__input-error passwordAuthorize-error"></span>

                <button type="submit" className="authorize__button">Войти</button>
            </form>

        </div>
    )
}

export default Login;