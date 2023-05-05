import React from 'react';

function PopupWithForm({ title, name, titleButton, isOpen, onClose, children, onSubmit }) {

    return (
        <div className={isOpen ? `popup popup_opened popup_${name}` : `popup popup_${name}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>

                <form onSubmit={onSubmit} className={`popup__form popup__form_${name}`} name={name}>
                    {children}
                    <button onClick={onClose} type="submit" className="popup__button">{titleButton}</button>
                </form>

                <button onClick={onClose} type="button" className="popup__close"></button>
            </div>
        </div>
    );
}

export default PopupWithForm;