const express = require('express');
const router = express.Router();
const ratings = require('../controllers/ratings');


router.get('/:movieId/getRatings', ratings.getRatings);

router.post('/:movieId/postRatings', ratings.postRatings);

module.exports = router;