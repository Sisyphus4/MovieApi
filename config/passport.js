const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const Users = require('../models/users');
const key = require('./keys');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secretOrKey;
module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    Users.findById(jwtPayload.id)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(error => console.log(error))
  }))
}