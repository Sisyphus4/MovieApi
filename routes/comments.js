const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
  session: false
});

router.get('/:movieId', comments.getComments);

router.post('/:movieId', auth, comments.postComment);

router.put('/:id', auth, comments.updateComment);

router.delete('/:id', auth, comments.deleteComment);

module.exports = router;