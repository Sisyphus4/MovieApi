const { uuid } = require('uuidv4');

const Comments = require("../models/comments");

exports.getComments = ({ params }, res) => {
    Comments.find({ movieId: params.movieId })
        .then(comment => {
            if (comment.length === 0) throw new Error('Something went wrong!');
            res.json({
                comment,
            });
        })
        .catch(err => {
            res.send(err.message);
        });
};

exports.postComment = ({ params, body }, res) => {
    const { text, author } = body;
    const movieId = params.id;
    const id = uuid();
    const date = new Date;
    const newComment = new Comments({ movieId, id, text, author, date });
    newComment
        .save()
        .then(createdComment => res.json(createdComment))
        .catch(({ message }) => res.status(404).json({ message }));

};

exports.updateComment = ({ body }, res) => {
    Comments.updateOne({ id: body.id }, { text: body.text })
        .then(() => {
            res.send("Updated");
        })
        .catch((err) => {
            res.send(err.message);
        });
};

exports.deleteComment = ({ body }, res) => {
    Comments.deleteOne({ id: body.id })
        .then(() => {
            res.send("Deleted");
        })
        .catch((err) => {
            res.send(err.message);
        });
};
