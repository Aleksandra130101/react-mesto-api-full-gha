import React from 'react';
import reg from '../images/reg.png';
import noReg from '../images/noReg.png';

function InfoTooltip({ isOpen, onClose, registerIn, text }) {
    
    return (
        <div className={isOpen ? `popup popup_register popup_opened` : `popup popup_register`}>
            <div className="popup__container">

                <img className="popup__image" src={registerIn ? reg : noReg} alt={registerIn ? `успешно` : `не успешно`}/>

                <h2 className="popup__subtitle">{text}</h2>

                <button onClick={onClose} type="button" className="popup__close"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;