const Ratings = require("../models/averageRating");
const Users = require("../models/users");

exports.getRatings = ({ params }, res) => {
    Ratings.findOne({ movieId: params.movieId })
        .then(rating => {
            if (!rating) res.json({ rating: 0 });
            res.json({ rating: rating.voteSum / rating.voteCount });
        })
        .catch(err => {
        });
};

exports.postRatings = ({ params, body, user }, res) => {
    const { voteValue } = body;
    const movieId = params.movieId;
    if (!(user.ratedMovies.indexOf(movieId) > -1)) {
        Ratings.findOne({ movieId: movieId })
            .then(rating => {
                if (rating) {
                    Ratings.updateOne({ movieId: movieId }, { $inc: { voteSum: voteValue, voteCount: 1 } })
                        .then(() => {
                            Users.updateOne({ _id: user._id }, { $push: { ratedMovies: movieId } }).then(() => { });
                            Ratings.findOne({ movieId: movieId })
                                .then(result => {
                                    res.json({ rating: result.voteSum / result.voteCount });
                                })
                        })
                        .catch((err) => {
                            res.send(err.message);
                        });
                }
                else {
                    const newRaing = new Ratings({ movieId, voteSum: voteValue, voteCount: 1 });
                    newRaing
                        .save()
                        .then(result => {
                            Users.updateOne({ _id: user._id }, { $push: { ratedMovies: movieId } }).then(() => { });
                            res.json({ rating: result.voteSum / result.voteCount });
                        })
                        .catch(({ message }) => res.status(404).json({ message }));
                }
            })
            .catch(err => {
                res.send(err.message);
            });
    }
    else {
        res.send("You've already voted!")
    }
};
