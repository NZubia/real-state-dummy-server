var express = require('express');
var router = express.Router();

const {
  User
} = require('../models/user.model');

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  const userName = req.body.userName;
  const userPass = req.body.userPass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (userName && userPass && firstName && lastName){
    const newUser = await new User({
      userName: userName,
      password : userPass,
      firstName: firstName,
      lastName: lastName
    }).save()


    res.status(200).json({
      "message": "OK",
      "obj": newUser
    })
  } else {
    res.status(400).json({
      "message": "Several fields were missing"
    })
  }
});

router.post('/login', async function(req, res, next) {
  const userName = req.body.userName;
  const userPass = req.body.userPass;

  if (userName && userPass){
    const user = await User.findOne({
      userName: userName,
      password: userPass
    });
    if (user) {
      res.status(200).json({
        "message": "OK"
      })
    } else {
      res.status(400).json({
        "message": "User or password are wrong"
      })
    }

  } else {
    res.status(400).json({
      "message": "Several fields were missing"
    })
  }
});

module.exports = router;
