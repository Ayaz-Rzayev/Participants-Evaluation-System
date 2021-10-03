const express = require('express');
const router = express.Router();
// Error handling
const ExpressError = require('../ExpressError');
const catchAsync = require('../catchAsync');
//Middleware
const {isLogedIn, isAdmin}  = require('../middleware')
// Schemas
const User = require('../models/user');
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 12;
//Session
const session = require('express-session');

router.get('/users', isLogedIn, isAdmin, catchAsync(async(req, res, next) => {
  const users = await User.find()
  res.render('users/users', {users})
}))

router.put('/users/:id', isLogedIn, isAdmin, catchAsync(async(req, res, next) => {
  const {id} = req.params
  const user = await User.findById(id)
  user.isAdmin = true
  await user.save()
  const users = await User.find()
  res.render('users/users', {users})
}))

router.get('/register', (req, res) => {
  res.render('users/register')
})

router.post('/register', catchAsync(async(req, res, next) => {
  const {username, email, password} = req.body.user
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(password, salt)
  const user = new User({
    username,
    email,
    password:hashedPw
  })
  await user.save()
  res.redirect('/projects')
}))

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login', async(req, res, next) => {
  const {username, password} = req.body.user
  const foundUser = await User.findOne({username})
  const validPassword = await bcrypt.compare(password, foundUser.password)
  if(validPassword){
    req.session.user_id = foundUser._id
    res.redirect('/projects')
  }else{
    res.send('Nope')
  }
})

router.post('/logout', (req, res) => {
  req.session.user_id = null
  res.redirect('/login')
})

module.exports = router;