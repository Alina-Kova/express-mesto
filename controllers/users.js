const User = require('../models/users');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'CastError') {
        return res
      }

    } res.status(500).send({ message: 'Пользователь по указанному _id не найден.' }));
};

module.exports.createUser  = (req, res) => {

};

module.exports.updateProfile  = (req, res) => {

};

module.exports.updateAvatar = (req, res) => {

};
