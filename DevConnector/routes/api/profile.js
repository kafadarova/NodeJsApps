const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput  = require('../../validation/education');


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
  .populate('user', ['name', 'avatar'])
    .then(profile => { // get the prfile which it gives us
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';        
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET to api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find() 
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles for this user id';
        return res.status(404).json(errors);
      }
      res.json(profiles); // will return 200
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});

// @route   GET to api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({handle: req.params.handle}) //req.params.handle - will grab /:handle from URL
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile); // will return 200
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET to api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({user: req.params.user_id}) // not only loged in user, but whatever user is passed in
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile); // will return 200
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user id'}));
});
 
// @route   Post to api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => { // protected route - we will get a token
    const {errors, isValid} = validateProfileInput(req.body);
    
    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id; // get from the logged in user
  if (req.body.handle) profileFields.handle = req.body.handle; 
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  
  //Skills - Split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(','); // make an array with the skills
  } 
  // social
  profileFields.social = {}; // initialize an object
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
  Profile.findOne({user: req.user.id})
  .then(profile => {
    if(profile) {
      // Update
      Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields}, {new: true}) //update the profile with the new infos
      .then(profile => res.json(profile)); // adter update respond with the updated profile
    } else {
      // Create
      
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle})
      .then(profile => {
        if(!profile) {
          errors.handle= 'That handle already exists';
          res.status(404).json(errors);
        }
        
        //Save profile
        new Profile(profileFields).save()
        .then(profile => res.json(profile));
      });
    }
  })
});

// @route   Post to api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {errors, isValid} = validateExperienceInput(req.body);
  
  //Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    const newExp = { // new experience
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    // Add to exp array
    profile.experience.unshift(newExp); // add the exps to the begging of the array
    profile.save().then(profile => res.json(profile));
  })
});

// @route   Post to api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {errors, isValid} = validateEducationInput(req.body);
  
  //Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    const newEdu = { // new experience
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    // Add to exp array
    profile.education.unshift(newEdu); // add the education to the begging of the array
    profile.save().then(profile => res.json(profile));
  })
});
module.exports = router;

