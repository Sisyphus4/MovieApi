const express = require('express');
const router = express.Router();
const ratings = require('../controllers/ratings');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
  session: false
});

router.get('/:movieId', ratings.getRatings);

router.post('/:movieId', auth, ratings.postRatings);

module.exports = router;