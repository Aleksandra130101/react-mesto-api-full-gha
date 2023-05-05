import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });

        avatarRef.current.value = "";
    }


    return (
        <PopupWithForm
            title="Обновить аватар"
            name="change-avatar"
            titleButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={avatarRef} id="linkAvatar" type="url" className="popup__input popup__input_link_avatar" placeholder="Ссылка на аватарку" name="nameCards" required minLength="2" maxLength="200" />
            <span className="popup__input-error linkAvatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;