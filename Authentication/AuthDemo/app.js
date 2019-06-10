const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParses = require('body-parser'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');
      
mongoose.connect('mongodb://localhost/auth_demo_app', {
  useNewUrlParser: true
});

const app = express();
app.set('view engine', 'ejs');

app.use(require('express-session')({
  secret: 'Jerry is the sweeetest dog in the world',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // use passport
app.use(passport.session());

// reading the session 
passport.serializeUser(User.serializeUser()); // encode the session
passport.deserializeUser(User.deserializeUser()); //decode the session

app.get('/', (req, res) => {
  res.render('home');
});

app.get('secret', (req, res) => {
  res.render('secret');
});
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('server started ..');
});