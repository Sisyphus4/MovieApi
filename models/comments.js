let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    id: Number,
    text: {
      type: String,
      required: [
        true, 'Enter new\'s text'
      ],
    },
    author: String
  });


const Comments = mongoose.model('Comments', MoviesSchema);

module.exports  = Comments;
