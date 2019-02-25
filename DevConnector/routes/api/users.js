const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// Load User model
const User = require('../../models/User');

// @route   GET to api/users/test
// @desc    Tests user routes
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: "Users works"});  // output json
});


// @route   GET to api/users/register
// @desc    Register user 
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // if errors - check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email})  // looking for a record that has the email 
  .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
      // return res.status(400).json({email: 'Email already exists'});`
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });
      const newUser = new User({  //create a resource with Moongoose  - new and then the model name
        name: req.body.name,
        email: req.body.email,
        avatar,  // avatar: avatar
        password: req.body.password
      });
      
      // generate salt
      bcrypt.genSalt(10, (err, salt) => { // err or salt
        bcrypt.hash(newUser.password, salt, (err, hash) => { // err or hash
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user)) // send a successful response with the new user
          .catch(err => console.log(err)); // log the error if any
        })
      })
    }
  })
});

// @route   GET to api/users/login
// @desc    Login user - returning jwt token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // if errors - check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  // find user by email
  User.findOne({email: email})
  .then(user => {
    // check for user
    if(!user) { 
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }
  // Check password
  bcrypt.compare(password, user.password)
  .then(isMatch => { // receive true or false value - we call it isMatch
    if(isMatch) {
      // res.json({msg: 'Success'})
      // User Matched
      const payload = {id: user.id, name: user.name, avatar: user.avatar}  // User information -id // Create a token
      
      // Sign Token
      jwt.sign(
          payload, 
          keys.secretOrKey, 
          { expiresIn: 3600}, 
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
      });
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  })
  });
});

// @route   GET to api/users/current
// @desc    return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {  // jwt -strategy, session - false, because we dont use session
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}); 

module.exports = router;

