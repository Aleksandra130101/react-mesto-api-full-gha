import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
    return (
        <section className={isOpen ? `popup popup_figure popup_opened` : 'popup popup_figure'}>
            <figure className="popup__figure-container">
                <button onClick={onClose} className="popup__close popup__figure-close"></button>
                <img src={card.link} className="popup__figure-image" alt={card.name} />
                <figcaption className="popup__figure-text">{card.name}</figcaption>
            </figure>
        </section>
    );
}

export default ImagePopup;