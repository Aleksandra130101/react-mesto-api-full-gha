import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { Link, Routes, useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

function Header({ email }) {


    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('token');
        navigate("/sign-in", {replace: true})
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />

            <Routes>
                <Route path='/sign-in' element=
                    {
                        <Link to='/sign-up' className='header__link'>Регистрация</Link>
                    }
                />

                <Route exact path='/' element=
                    {
                        <div className='header__wrapper'>
                            <p className='header__user'>{email}</p>
                            <button onClick={signOut} to='/sign-in' className='header__link header__link_button'>Выйти</button>
                        </div>

                    }
                />

                <Route path='/sign-up' element=
                    {
                        <Link to='/sign-in' className='header__link'>Войти</Link>
                    }
                />
            </Routes>
        </header>

    );
}

export default Header;

