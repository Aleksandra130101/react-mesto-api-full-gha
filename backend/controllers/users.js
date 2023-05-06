require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/not-found-err');
const SomethingWrongRequest = require('../errors/somethingWrongRequest');
const ConflictError = require('../errors/conflictError');


const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

// Get запрос возвращает пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

// Get запрос ищет пользователя по id
module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь по id не найден!!!'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SomethingWrongRequest('Передан некорретный ID!!!'));
      } else {
        next(err);
      }
    });
};

// Создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new SomethingWrongRequest('При создании пользователя переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// login

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      //res.cookie('jwt', token, {
        //maxAge: 3600000,
        //httpOnly: true,
      //});
      res.status(200).send({ token }); //Все комметраии "Можно лучше", сделаю)
    })
    .catch((err) => {
      next(err);
    });
};


// Обновление профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  console.log("name= " + name, + " about=" + about)
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь по id не найден!!!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SomethingWrongRequest('При обновлении профиля переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь по id не найден!!!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SomethingWrongRequest('При обновлении аватара переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// получение  информации от пользователе
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
