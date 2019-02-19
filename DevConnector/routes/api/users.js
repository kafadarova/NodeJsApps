const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// load User model
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
  User.findOne({ email: req.body.email})  // looking for a record that has the email 
  .then(user => {
    if(user) {
      return res.status(400).json({email: 'Email already exists'});
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


module.exports = router;

