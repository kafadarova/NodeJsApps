const express = require('express');
const bodyParser = require('body-parser');
// Simplify the file paths
const path = require('path');
const expressValidator = require('express-validator');

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

// Global Variables
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
})
// Add an express validator middleware
// Set error formatting
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

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

// Specify that first Name is required
  req.checkBody('first_name', 'First Name is Required').notEmpty();
  req.checkBody('last_name', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'Email is Required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });
  } else {
    // If there arent any errors - create an object
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };
  console.log('Success');
    }
});

// Listen to a port & set a callback function
app.listen(3000, () => {
  console.log('Server Started on Port 3000..');
});
