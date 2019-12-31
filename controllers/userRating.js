const UserRating = require("../models/userRating")

exports.getUserRating = ({ params, user }, res) => {
    UserRating.findOne({ movieId: params.movieId, userId: user._id })
        .then(rating => {
            if (!rating) res.json({ rating: 0 });
            res.json({ rating: rating.voteValue });
        })
        .catch(err => {
        });
};

exports.postUserRating = ({ params, body, user }, res) => {
    const { voteValue } = body;
    const movieId = params.movieId;
    const newRaing = new UserRating({ movieId, userId: user._id, voteValue });
    if (!(user.ratedMovies.indexOf(movieId) > -1)) {
        newRaing
        .save()
        .then(result => {
            response = result.toObject();
            res.json({ rating: response.voteValue });
        })
        .catch(({ message }) => res.status(404).json({ message }));
    }
    else {
        res.send("You've already voted!")
    }
};
