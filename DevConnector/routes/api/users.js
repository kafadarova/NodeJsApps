const express = require('express');
const router = express.Router();

// @route   GET to api/users/test
// @desc    Tests user routes
// @access  Public
router.get('/test', (req, res) =>{
  res.json({msg: "Users works"});  // output json
});

module.exports = router;

