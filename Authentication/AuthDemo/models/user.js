const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  passport: String
});

module.exports = mongoose.model('User', UserSchema);