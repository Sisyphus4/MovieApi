let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RatingSchema = new Schema({
  movieId: Number,
  voteSum: {
    type: Number,
    required: [
      true, 
    ],
  },
  voteCount: Number,
});


const Ratings = mongoose.model('Ratings', RatingSchema);

module.exports = Ratings;
