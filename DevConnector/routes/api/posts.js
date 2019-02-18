const express = require('express');
const router = express.Router();

// @route   GET to api/posts/test
// @desc    Tests post routes
// @access  Public
router.get('/test', (req, res) =>{
  res.json({msg: "Post works"});  // output json
});

module.exports = router;

