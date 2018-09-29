const express = require('express');
const bodyParser = require('body-parser');
// Simplify the file paths
const path = require('path');

const app = express();

// // Add a custom middleware
// const logger = (req, res, next) => {
//   console.log('Logging..');
//   next();
// };
// // Call the custom middleware called logger
// app.use(logger);

// Add body parses middleware to handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.statis(path.join(__dirname,'public')));

// Routes
// Visit an app/website is a GET request
// Submitting a form - POST request
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Listen to a port & set a callback function
app.listen(3000, () => {
  console.log('Server Started on Port 3000..');
});
