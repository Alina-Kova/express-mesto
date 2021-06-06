const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const login = require('./routes/users');
const createUser = require('./routes/users');
require('dotenv').config();
const { JWT_SECRET } = process.env;

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// http://localhost:3000/users

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60b54f338181990dab3ab611',
  };
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.post('/signin', login);
app.post('/signup', createUser);
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// здесь обрабатываем ошибку 404
app.use((req, res) => {
  res.status(404).send({ message: 'Карточка или пользователь не найден.' });
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
