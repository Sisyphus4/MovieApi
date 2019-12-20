const Ratings = require("../models/rating");

exports.getRatings = ({ params }, res) => {
    Ratings.findOne({ movieId: params.movieId })
        .then(rating => {
            if (!rating) throw new Error('Something went wrong!');
            res.json({ rating: rating.voteSum / rating.voteCount });
        })
        .catch(err => {
            res.send(err.message);
        });
};

exports.postRatings = ({ params, body }, res) => {
    const { voteSum, voteCount } = body;
    const movieId = params.movieId;
    Ratings.findOne({ movieId: params.movieId })
        .then(rating => {
            if (rating) {
                Ratings.updateOne({ movieId: params.movieId }, { $inc: { voteSum: voteSum, voteCount: 1 } })
                    .then(() => {
                        Ratings.findOne({ movieId: params.movieId })
                            .then(result => {
                                res.json({ rating: result.voteSum / result.voteCount });
                            })
                    })
                    .catch((err) => {
                        res.send(err.message);
                    });
            }
            else {
                const newRaing = new Ratings({ movieId, voteSum, voteCount: 1 });
                newRaing
                    .save()
                    .then(result => {
                        res.json({ rating: result.voteSum / result.voteCount });
                    })
                    .catch(({ message }) => res.status(404).json({ message }));
            }
        })
        .catch(err => {
            res.send(err.message);
        });
};
