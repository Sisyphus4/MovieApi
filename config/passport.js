const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const Users = require('../models/users');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;
module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    Users.findById(jwtPayload.id)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(error => console.log(error))
  }))
}