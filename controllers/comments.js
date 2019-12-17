const Comments = require("../models/comments");

exports.getComments = ({ params }, res) => {
    Comments.findOne({ id: params.id })
        .then(comment => {
            if(comment==null) throw error;
            res.json(comment);
        })
        .catch(err => {
            res.json("Something went wrong!");
        });
};
