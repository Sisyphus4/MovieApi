const express = require('express');
const comments = require("./routes/comments");
const ratings = require("./routes/ratings");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection ='mongodb+srv://Admin:Admin@cluster0-ikekk.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!');
});
app.use(cors());

app.use('/api/comments', comments);
app.use('/api/ratings', ratings);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
