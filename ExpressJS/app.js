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

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Add body parses middleware to handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname,'public')));

let users = [
{
  id: 1,
  first_name: 'Kristin',
  last_name: 'Kafadarova',
  email: 'kkafadarova@gmail.com'
},
{
  id: 2,
  first_name: 'Eva',
  last_name: 'Kafadarova',
  email: 'ekafadarova@gmail.com'
},
{
  id: 3,
  first_name: 'Mariya',
  last_name: 'Kafadarova',
  email: 'mkafadarova@gmail.com'
}
];

// Routes
// Visit an app/website is a GET request
// Submitting a form - POST request
app.get('/', (req, res) => {
  // res.json(person);
  // res.send('Hello World');
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

// Catch the submisson of the form from the index html
app.post('/users/add',(req,res) => {
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  console.log(newUser);
});

// Listen to a port & set a callback function
app.listen(3000, () => {
  console.log('Server Started on Port 3000..');
});
