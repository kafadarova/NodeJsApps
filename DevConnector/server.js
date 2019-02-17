const express = require('express');
const mongoose = require('mongoose');

const app = express();


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
  
app.get('/', (req, res) => {
  res.send('Hello');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});