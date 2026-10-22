const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// шаблонизатор EJS и папка со статикой
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// название сайта доступно во всех шаблонах
app.locals.siteName = 'ПринтерМаркет';

app.use('/', require('./routes/catalog'));
app.use('/', require('./routes/product'));

app.get('/', (req, res) => {
  res.render('index', );
});

app.get('/catalog', (req, res) => {
  res.render('catalog');
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});

app.get('/registrations', (req, res) => {
  res.render('registrations');
});

app.get('/autorizations', (req, res) => {
  res.render('autorizations');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
