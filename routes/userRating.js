const express = require('express');
const router = express.Router();
const userRating = require('../controllers/userRating');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
  session: false
});

router.get('/:movieId', auth, userRating.getUserRating);

router.post('/:movieId', auth, userRating.postUserRating);

module.exports = router;