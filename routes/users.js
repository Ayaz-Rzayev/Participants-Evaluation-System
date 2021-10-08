const express = require('express');
const router = express.Router();
//load environment variables from a .env file.
require('dotenv').config();
// require token model for e-mail verification
const Token = require('../models/token');
//crypto for creating tokens
const crypto = require('crypto');
const {sendEmail} = require('../functions');
// Error handling
const ExpressError = require('../ExpressError');
const catchAsync = require('../catchAsync');
//Middleware
const {isLogedIn, isAdmin, validateUser}  = require('../middleware')
// Schemas
const User = require('../models/user');
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 12;
//Session
const session = require('express-session');

router.get('/users', isLogedIn,  isAdmin, catchAsync(async(req, res, next) => {
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

router.post('/register', validateUser, catchAsync(async(req, res, next) => {
  const {username, email, password} = req.body.user
  let user = await User.findOne({email: email})
  if(user){
    throw new ExpressError('User with given e-mail already exists', 400)
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(password, salt)
  user = await new User({
    username,
    email,
    password:hashedPw
  }).save()

  let token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex')
  }).save()

  const msgText = `${process.env.BASE_URL}/verify/${user._id}/${token.token}`
  await sendEmail(user.email, 'Verify your e-mail', msgText)
  req.flash('success', `A verification mail was sent to ${email} please confirm your email`)
  res.redirect('/login')
}))

router.get('/verify/:id/:token', catchAsync(async(req, res, next) => {
  const {id, token} = req.params
  const user = await User.findById(id)
  if(!user){
    throw new ExpressError('Invalid', 400)
  }

  const foundToken = await Token.findOne({userId: user._id, token: token})
  if(!foundToken){
    throw new ExpressError('Invalid', 400)
  }
  user.verified = true
  await user.save()
  await Token.findByIdAndRemove(foundToken._id)

  req.flash('success', `Email has been verified, Welcome!`)
  res.redirect('/projects')
}))

router.get('/login',  (req, res) => {
  res.render('users/login')
})

router.post('/login', async(req, res, next) => {
  const {username, password} = req.body.user
  const user = await User.find({username: username})
  //if user didn't verified his e-mail ask to do so
  if(!user[0].verified) {
      req.flash('error','Please verify your e-mail adress')
      return res.redirect('/login')
  }
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