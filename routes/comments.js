const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');


router.get('/:movieId/getComments', comments.getComments);

router.post('/:id/postComment', comments.postComment);

router.put('/:id/updateComment', comments.updateComment);

router.delete('/deleteComment/:id', comments.deleteComment);

module.exports = router;