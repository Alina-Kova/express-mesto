const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
  // вставьте сюда _id созданного в предыдущем пункте пользователя
    _id: '',
  };
  next();
});

// app.listen(PORT);
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

/// /////////
// // http://localhost:3000/users
// const mongoose = require('mongoose');
// // подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });
// const bodyParser = require('body-parser');
// const express = require('express');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT = 3000 } = process.env;
// const { login, createUsers } = require('./controllers/users');
// const auth = require('./middlewares/auth');

// const app = express();

// var cors = require('cors');

// const allowedCors = [
//   'http://localhost:3001',
//   "http://deliorno.mesto-react.nomoredomains.icu",
//   "https://deliorno.mesto-react.nomoredomains.icu"
// ];

// app.use(
//   cors({
//     origin: allowedCors,
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(requestLogger); // подключаем логгер запросов

// app.post('/signin', login);
// app.post('/signup', createUsers);
// app.use(auth);
// app.use('/cards', require('./routes/cards'));
// app.use('/users', require('./routes/users'));

// app.use(errorLogger); // подключаем логгер ошибок

// //app.use(errors()); // обработчик ошибок celebrate

// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Обращение по неизвестному адресу' });
// });
// app.use((err, req, res, next) => {
//   if (err.statusCode || err.code || err.name) {
//     if (err.name === 'CastError' || err.name === 'ValidationError') {
// eslint-disable-next-line max-len
//       res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
//     } else if (err.name === 'MongoError' && err.code === 11000) {
//       res.status(409).send({ message: 'Такой пользователь уже существует' });
//     } else {
//       res.status(err.statusCode).send({ message: err.message });
//     }
//   } else {
//     res.status(500).send({ message: err.message });
//   }
// });

// app.listen(PORT, () => {
//   // Если всё работает, консоль покажет, какой порт приложение слушает
//   console.log(`App listening on port ${PORT}`);
// });
/// ////////////////////////
/* eslint-disable no-unused-vars */
// require('dotenv').config();
// const express = require('express');

// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');
// const { isURL } = require('validator');

// const auth = require('./middlewares/auth');

// const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
// const { createUser, login } = require('./controllers/users');
// const { usersRoutes } = require('./routes/users.js');
// const { cardsRoutes } = require('./routes/cards.js');
// const ValidationError = require('./errors/validation-err');
// const NotFoundError = require('./errors/not-found-err');

// mongoose.set('debug', true);

// const app = express();

// app.use(bodyParser.json());

// app.use(cookieParser());

// mongoose.connect(MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const validateUrl = (value, helpers) => {
//   if (!isURL(value, { require_protocol: true })) {
//     return helpers.message('В данном поле допустимы только валидные ссылки');
//   }
//   return value;
// };

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//     avatar: Joi.string().custom(validateUrl, 'Ссылка не валидна').default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
//     name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
//     about: Joi.string().min(2).max(30).default('Исследователь'),
//   }),
// }), createUser);

// app.use('/', auth, usersRoutes);
// app.use('/', auth, cardsRoutes);

// app.use((req, res, next) => {
//   next(new NotFoundError('Ресурс не найден'));
// });

// app.use(errors());

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message,
//     });
//   next();
// });

// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`App listening on port ${PORT}`);
// });

// module.exports = app;
