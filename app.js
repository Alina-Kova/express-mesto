const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
require('dotenv').config();

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', auth, cardsRoutes);
app.use('/users', auth, usersRoutes);
app.post('/signin', login);
app.post('/signup', createUser);

// обработчики ошибок

// обработчик ошибок celebrate
// app.use(errors());

// обрабатываем ошибку 404
app.use(() => {
  throw new NotFoundError('Карточка или пользователь не найден.');
});
// обрабатываем ошибку 500
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
