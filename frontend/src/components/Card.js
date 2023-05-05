import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  //Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  //console.log("props gen=" + JSON.stringify(props))
  //console.log("props=" + JSON.stringify(props.card.owner._id))
  //console.log("currentUser=" + JSON.stringify(currentUser._id))
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_black'}`
  );;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img onClick={handleClick} className="element__image" alt={props.card.name} src={props.card.link} />

      <div className="element__text">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button onClick={handleLikeClick} className={`${cardLikeButtonClassName}`} type="button"></button>
          <p className="element__number">{props.card.likes.length}</p>
        </div>
      </div>

      {isOwn && <button onClick={handleDeleteClick} className="element__trash" type="button"></button>}
    </article>

  )
}

export default Card;