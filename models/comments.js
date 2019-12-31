let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CommentSchema = new Schema({
  movieId: Number,
  userId: String,
  text: {
    type: String,
    required: [
      true, 'Enter comment\'s text'
    ],
  },
  author: {
    type: String,
    required: [
      true, 'Enter comment\'s author'
    ],
  },
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

CommentSchema.set('toObject', { versionKey: false });
CommentSchema.options.toObject.transform = (doc, ret) => {
  ret.id=doc._id;
  delete ret._id;
  return ret;
}
const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
