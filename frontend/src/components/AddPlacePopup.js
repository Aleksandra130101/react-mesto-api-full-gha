import React, { useState, useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const newCardRef = useRef();
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            image: newCardRef.current.value,
        });

        setName('');
        newCardRef.current.value = "";
    }

    function handleNameNewCard(evt) {
        setName(evt.target.value);
    }


    return (
        <PopupWithForm
            title="Новое место"
            name="cards"
            titleButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input onChange={handleNameNewCard} value={name || ""} id="nameCard" type="text" className="popup__input popup__input_name_cards" placeholder="Название" name="nameCards" required minLength="2" maxLength="30" />
            <span className="popup__input-error nameCard-error"></span>
            <input ref={newCardRef} id="linkCard" type="url" className="popup__input popup__input_desc_cards" placeholder="Ссылка на картинку" name="linkCards" required />
            <span className="popup__input-error linkCard-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;