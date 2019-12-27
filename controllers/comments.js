const Comments = require("../models/comments");

exports.getComments = ({ params }, res) => {
    Comments.find({ movieId: params.movieId })
        .then(comments => {
            if (!comments && !comments.length) throw new Error('Something went wrong!');
            let response = comments.map(comment => comment.toObject());
            res.send(response);
        })
        .catch(err => {
            res.send(err.message);
        });
};

exports.postComment = ({ params, body, user }, res) => {
    const { text } = body;
    const movieId = params.movieId;
    const author = user.username;
    const userId = user._id;
    const newComment = new Comments({ movieId, userId, text, author });
    newComment
        .save()
        .then(createdComment => {
            let str = JSON.stringify(createdComment);
            str = str.replace("\"_id\":", "\"id\":");
            json = JSON.parse(str);
            res.json(json);
        })
        .catch(({ message }) => res.status(404).json({ message }));
};

exports.updateComment = ({ body, params, user }, res) => {
    //We have to find comment to check if it's the right user
    Comments.findOne({ _id: params.id })
        .then(comment => {
            if (comment.userId == user._id) {
                Comments.updateOne({ _id: params.id }, { text: body.text })
                    .then(() => {
                        Comments.findOne({ _id: params.id })
                            .then(({ _id: id, movieId, userId, text, author, createdAt, updatedAt }) => res.json({
                                id,
                                movieId,
                                userId,
                                text,
                                author,
                                createdAt,
                                updatedAt
                            }))
                    })
                    .catch((err) => {
                        res.send(err.message);
                    });
            }
            else {
                res.send("it's not your comment!")
            }
        });
};

exports.deleteComment = ({ params, user }, res, ) => {
    Comments.findOne({ _id: params.id })
        .then(comment => {
            if (comment.userId == user._id) {
                Comments.deleteOne({ _id: params.id })
                    .then(() => {
                        res.json({ message: 'deleted' });
                    })
                    .catch((err) => {
                        res.send(err.message);
                    });
            }
            else {
                res.send("it's not your comment!")
            }
        });
};
