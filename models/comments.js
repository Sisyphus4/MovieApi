let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CommentSchema = new Schema({
  movieId: Number,
  id: String,
  text: {
    type: String,
    required: [
      true, 'Enter new\'s text'
    ],
  },
  author: String,
  date: Date
});


const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
