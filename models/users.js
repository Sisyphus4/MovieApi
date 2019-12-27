let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: [
      true, 'Enter new\'s text'
    ],
  },
  password: {
    type: String,
    required: [
      true, 'Enter new\'s text'
    ],
  },
  ratedMovies: [],
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
