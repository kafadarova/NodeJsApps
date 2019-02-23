const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes 
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

const options = { 
  keepAlive: true,
  connectTimeoutMS: 30000,
  reconnectInterval: 1000,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  autoReconnect: true
};

// Connect to MongoDB
mongoose
  .connect(db, options)
  .then(() => console.log('MongoDB connected')) //success
  .catch(err => console.log(err)); // error
  
// Pasport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport); // add the route and pass passport itself

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});