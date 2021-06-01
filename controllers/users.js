const User = require('../models/users');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      runValidators: true, // валидация данных
      new: true, // получаем в then обновлённую запись
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      runValidators: true, // валидация данных
      new: true, // получаем в then обновлённую запись
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
