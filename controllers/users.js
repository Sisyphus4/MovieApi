const Users = require("../models/users");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser = ({ body }, res) => {
    const { username, password } = body;
    const ratedMovies = [''];
    Users.findOne({ username })
        .then(user => {
            if (user) {
                res
                    .status(400)
                    .json({ message: "User with this username already exists." });
            } else {
                const newUser = new Users({ username, password, ratedMovies });
                bCrypt.genSalt(10, (error, salt) => {
                    bCrypt.hash(password, salt, (error, hash) => {
                        if (error) res.status(404).json({ ...error });
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(crearedUser => {
                                const payload = { id: crearedUser._id, username: crearedUser.username };
                                jwt.sign(
                                    payload,
                                    process.env.SECRET,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            user: {
                                                username: crearedUser.username,
                                                userId: crearedUser._id,
                                                ratedMovies: crearedUser.ratedMovies,
                                            },
                                            token: token,
                                        });
                                    }
                                );
                            })
                            .catch(err => res.status(404).json({ message }));
                    });
                });
            }
        })
        .catch(({ message }) => res.status(404).json({ message }));
};

exports.loginUser = ({ body }, res) => {
    let { username, password } = body;
    Users.findOne({ username })
        .then(user => {
            if (!user) {
                res.status(400).json({ message: "Wrong password or username" });
            }
            bCrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = { id: user._id, username: user.username };

                    jwt.sign(
                        payload,
                        process.env.SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                user: {
                                    username: user.username,
                                    userId: user._id,
                                    ratedMovies: user.ratedMovies,
                                },
                                token: token,
                            });
                        }
                    );
                } else {
                    res.status(400).json({ message: "Wrong password or username" });
                }
            });
        })
        .catch(err => {
            res.status(400).json({ message: "Wrong password or username" });
        })
};

exports.getUser = ({ user }, res) => {
    res.json({
        username: user.username,
        ratedMovies: user.ratedMovies,
        userId: user._id
    })
};
