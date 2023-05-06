import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { apiAuth } from '../utils/auth';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = useState('');
  const [email, setEmail] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const navigate = useNavigate();
  
  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.data);
      })
      .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  function handleRegisterUserClick() {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen)
  }

  //закрытие всех модалок
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard({});
    if (isRegisterPopupOpen) {
      setRegisterIn(false);
    }
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      //проверка токена
      // console.log("token1 = " + token);
        apiAuth.getContent(token)
          .then((res) => {
            
            if (res) {
              setEmail(res.email);
              setLoggedIn(true);
              navigate("/", { replace: true })
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
  }

  //авторизация
  function handleLogin(email, password) {
    console.log("email=" + email + " pass=" + password)
    return apiAuth.authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem('token', data.token);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        handleRegisterUserClick();
        console.log(err);
      })
  }

  //регистрация
  function handleRegister(email, password) {
    console.log("email=" + email + " pass=" + password)
    return apiAuth.register(email, password)
      .then(() => {
        setRegisterIn(!registerIn);
        setTextInfoTooltip('Вы успешно зарегистрировались!');
        handleRegisterUserClick();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        handleRegisterUserClick();
      })

  }

  //постановка лайка
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки


    !isLiked
      ? (api.putLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
          state.map((c) => c._id === card._id ? newCard.card : c));
        })
        .catch((err) => {
          console.log(err);
        }))

      : (api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>state.map((c) => c._id === card._id ? newCard.card : c));
        })
        .catch((err) => {
          console.log(err);
        })
      )
  }

  //удадение карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          const newState = state.filter((c) => {
            return c._id !== card._id
          })
          return newState;
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //смена данных пользователя
  function handleUpdateUser(user) {
    console.log("user.name=" + JSON.stringify(user.name) + " user.about=" + JSON.stringify(user.about));
    api.updateUserInfo(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //смена аватарки
  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //добавление новой карточки
  function handleAddPlace(card) {
    api.addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} />

        <Routes>
          <Route exact path='sign-in' element={<Login handleLogin={handleLogin} />} />
          <Route exact path='sign-up' element={<Register handleRegister={handleRegister} />} />

          <Route path='/' element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {loggedIn && < Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} registerIn={registerIn} text={textInfoTooltip}/>

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
