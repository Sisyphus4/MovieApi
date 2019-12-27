const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
  session: false
});

router.post('', users.registerUser);

router.post('/login', users.loginUser);

router.get('', auth, users.getUser);

module.exports = router;