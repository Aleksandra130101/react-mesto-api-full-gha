import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  // console.log("cards=" + JSON.stringify(cards));

  //Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">

      <section className="profile">
        <div className="profile__change-avatar">
          <div onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar" />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
      </section>

      <section className="elements">
        {
          cards.map((card, i) => (
            <Card 
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            ></Card>
          ))
        }

      </section>

    </main>


  );
}

export default Main;