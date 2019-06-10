const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  passport: String
});

// add a bunch of methods from the passportLocalMongoose package to the UserSchema
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);