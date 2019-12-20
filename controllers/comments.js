const Comments = require("../models/comments");

exports.getComments = ({ params }, res) => {
    Comments.find({ movieId: params.movieId })
        .then(comments => {
            if (!comments && !comments.length) throw new Error('Something went wrong!');
            var response = comments.map(({ _id: id, movieId, text, author, createdAt, updatedAt }) => ({
                id,
                movieId,
                text,
                author,
                createdAt,
                updatedAt
            }));
            res.send(response);
        })
        .catch(err => {
            res.send(err.message);
        });
};

exports.postComment = ({ params, body }, res) => {
    const { text, author } = body;
    const movieId = params.id;
    const newComment = new Comments({ movieId, text, author });
    newComment
        .save()
        .then(createdComment => {
            str = JSON.stringify(createdComment);
            str = str.replace("\"_id\":", "\"id\":");
            json = JSON.parse(str);
            res.json(json);
        })
        .catch(({ message }) => res.status(404).json({ message }));

};

exports.updateComment = ({ body }, res) => {
    Comments.updateOne({ _id: body.id }, { text: body.text })
        .then(() => {
            Comments.findOne({ _id: body.id })
                .then(comment => {
                    str = JSON.stringify(comment);
                    str = str.replace("\"_id\":", "\"id\":");
                    json = JSON.parse(str);
                    res.json(json);
                });
        })
        .catch((err) => {
            res.send(err.message);
        });
};

exports.deleteComment = ({ params }, res) => {
    Comments.deleteOne({ _id: params.id })
        .then(() => {
            res.json({ message: 'deleted' });
        })
        .catch((err) => {
            res.send(err.message);
        });
};
