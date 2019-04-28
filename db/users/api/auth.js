var mongoose = require('mongoose');
var user = require("../models/user");
var express = require('express')
var router = express.Router()

// JWT middleware
const jwt = require('express-jwt')
var jsonwebtoken = require('jsonwebtoken')
const site_secret = require('../config/secret')

// [POST] /login
router.post('/login', (req, res, next) => {
  user.findOne({
    id: req.body.id
  }, function(err, user) {
    if (err){
      return res.status(500).json(err)
    }

    if (user) {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // site_secret should be same with express-jwt (index.js)
          const accessToken = jsonwebtoken.sign({ id: user.id, name: user.name, role: user.role, institute: user.institute }, site_secret)
          return res.json({ token: { accessToken } })
        }
        else {
          return res.status(401).send({message: 'Authentication failed. Wrong password.'});
        }
      })
    }
    else {
      return res.status(401).send({message: 'Authentication failed. User not found.'});
    }
  })
})

// [GET] /user
router.get('/user', jwt({secret: site_secret}), (req, res, next) => {
  return res.json({ user: req.user })
})

// [POST] /logout
router.post('/logout', (req, res, next) => {
  return res.json({ status: 'OK' })
})

// [POST] /register
router.post('/register', (req, res, next) => {
  if (!req.body.id || !req.body.password) {
    return res.status(401).send({message: 'Please pass ID and password.'});
  }

  var newUser = new user( req.body );
  newUser.save(function(err) {
    if (err) {
      console.log(err)
      return res.status(401).send(err);
    }
    return res.json({message: 'Successful new user created.'});
  });
})

module.exports = router
