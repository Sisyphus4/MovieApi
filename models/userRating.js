let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserRatingSchema = new Schema({
  movieId: Number,
  userId: String,
  voteValue: {
    type: Number,
    required: [
      true, 'Enter your vote'
    ],
  },
});

UserRatingSchema.set('toObject', { versionKey: false });
UserRatingSchema.options.toObject.transform = (doc, ret) => {
  ret.id=doc._id;
  delete ret._id;
  return ret;
}
const UserRating = mongoose.model('userRating', UserRatingSchema);

module.exports = UserRating;
