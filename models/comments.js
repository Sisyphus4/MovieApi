let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CommentSchema = new Schema({
  movieId: Number,
  text: {
    type: String,
    required: [
      true, 'Enter new\'s text'
    ],
  },
  author: String,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});


const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
