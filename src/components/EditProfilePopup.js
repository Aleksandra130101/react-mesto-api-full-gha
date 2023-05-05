import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }



    //валидация формы

    /*const [error, setError] = React.useState('');

    function handleValidate(evt) {
        if (!evt.target.validity.valid) {
            setError(evt.target.validationMessage);
        } else {
            setError('');
        }
    }*/

    return (
        <PopupWithForm
            title="Редактирование профиля"
            name="profile"
            titleButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input onChange={handleNameChange} value={name || ''} id="nameProfile" type="text" className="popup__input popup__input_name_value" name="nameProfile" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__input-error nameProfile-error"></span>

            <input onChange={handleDescriptionChange} value={description || ''} id="jobProfile" type="text" className="popup__input popup__input_desc_value" name="jobProfile" placeholder="Занятие" required minLength="2" maxLength="200" />
            <span className="popup__input-error jobProfile-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;