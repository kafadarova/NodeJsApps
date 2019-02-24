// Create a passport strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose'); // searching for the user that comes with the payload
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    // console.log(jwt_payload);
    try {
      const user = await User.findById(jwtPayload.id) // this object has the user id in it
      if (user) { //if user has been found
        return done(null, user); // two parameters - 1.errors - there arent any, 2.the user   
      }
      return done(null, false); // there is no user 
    } catch (e) {
      console.log(e);
    }
  })
);
};