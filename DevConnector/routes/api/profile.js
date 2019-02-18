const express = require('express');
const router = express.Router();

// @route   GET to api/profile/test
// @desc    Tests profile routes
// @access  Public
router.get('/test', (req, res) =>{
  res.json({msg: "Profile works"});  // output json
});

module.exports = router;

