const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// {
//   "name": "Тестовый пользователь",
//   "about": "Информация о себе",
//   "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg"
// }
