const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app', {
  useNewUrlParser: true
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'Jerry is the sweeetest dog in the world',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // use passport
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
// reading the session 
passport.serializeUser(User.serializeUser()); // encode the session
passport.deserializeUser(User.deserializeUser()); //decode the session

// ============
// Router 
// ============
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret');
});

// Auth Routes
// show sign up form
app.get('/register', (req, res) => {
  res.render('register');
});

// handling user sign up
app.post('/register', (req, res) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    // log the user in
    // run serializeUser
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  });
});
const port = process.env.port || 3002;

// Login Routes
// render login form
app.get('/login', (req, res) => {
  res.render('login');
});

// login logic
// middleware - between the begging the route and the end of it
// authenticate the credentials
app.post('/login', passport.authenticate('local', { 
  successRedirect: '/secret',
  failureRedirect: '/login'
}),(req, res) => {
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(); //passport destoying all the user data
  res.redirect('/');
});

// middleware to check if the user is loggedin
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/login');
}

app.listen(port, () => {
  console.log('server started ..');
});