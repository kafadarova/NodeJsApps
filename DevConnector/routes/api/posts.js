const express = require('express');
const router = express.Router();
const moongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET to api/posts/test
// @desc    Tests post routes
// @access  Public
router.get('/test', (req, res) =>{
  res.json({msg: "Post works"});  // output json
});

// @route   Get to api/posts/posts
// @desc    Get posts
// @access  Public
router.get('/', (req,res) => {
  Post.find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({nopostsfound: 'No posts found with that id'}));;
});

// @route   Get to api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req,res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({nopostfound: 'No post found with that id'}));
});

// @route   Post to api/posts/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt',{ session: false }), (req,res) => {
  const {errors, isValid} = validatePostInput(req.body);
  
  // Check validation
  if(!isValid) {
    // if any errors, send 400 with erros objects
    return res.status(400).json(errors);
  }
  
  const newPost =  new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar, // pulling name,avatar,user from user state
    user: req.user.id // current logged in user
  });
  
  newPost.save().then(post => res.json(post));
});

// @route   Delete to api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id',passport.authenticate('jwt',{ session: false }), (req,res) => {
  // make sure that the user thats deleting it its the owner of the post
  Profile.findOne({user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      // Check for post owner
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({notauthorized: 'User not not authorized'});
      }
      // Delete 
      post.remove().then(() => res.json({success: true}));
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
  })
});

module.exports = router;

