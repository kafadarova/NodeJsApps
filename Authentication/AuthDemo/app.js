const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParses = require('body-parser'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/auth_demo_app', {
  useNewUrlParser: true
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('secret', (req, res) => {
  res.render('secret');
});
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('server started ..');
});