const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET to api/profile/test
// @desc    Tests profile routes
// @access  Public
router.get('/test', (req, res) =>{
  res.json({msg: "Profile works"});  // output json
});

// @route   GET to api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { // protected route - we will get a token
  const errors = {};
  Profile.findOne({ user: req.user.id})
    .then(profile => { // get the prfile which it gives us
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';        
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;

