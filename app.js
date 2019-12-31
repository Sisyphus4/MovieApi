require('dotenv').config()
const express = require('express');
const comments = require("./routes/comments");
const ratings = require("./routes/ratings");
const users = require("./routes/users");
const userRating = require("./routes/userRating");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passportConfig = require('./config/passport');
const passport = require('passport');
const rateLimit = require("express-rate-limit");


const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection =process.env.DB_CONNECT;

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!');
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
//app.use(limiter);

app.use(cors());

app.use(passport.initialize());
passportConfig(passport);

app.use(express.json({limit: '300kb'})); 
app.use('/api/comments', comments);
app.use('/api/ratings', ratings);
app.use('/api/users', users);
app.use('/api/userRating', userRating);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
