const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const axios = require('axios');
const captchaKey = require('../config/captcha.js')

let auth = passport.authenticate('jwt', {
  session: false
});

function captureCheck(req, res, next) {
  axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaKey.secretKey}&response=${req.body.recaptcha}`)
  .then(response=>{
    if(response.data.success){
      next();
    }
  })
}

router.post('', captureCheck, users.registerUser);

router.post('/login', users.loginUser);

router.get('', auth, users.getUser);

module.exports = router;