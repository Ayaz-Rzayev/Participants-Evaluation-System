const express = require('express');
const router = express.Router();
//load environment variables from a .env file.
require('dotenv').config();
const {
  renderLoginForm,
  renderRegisterForm,
  createUser,
  verifyUser,
  login,
  logout,
  renderUsersPage,
  makeAnAdmin} = require('../controllers/users')
//Middleware
const {isLogedIn, isAdmin, validateUser}  = require('../middleware')
// Schemas
const User = require('../models/user');
// require token model for e-mail verification
const Token = require('../models/token');
//crypto for creating tokens
const crypto = require('crypto');
const {sendEmail} = require('../functions');
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 12;
// Error handling
const ExpressError = require('../ExpressError');
const catchAsync = require('../catchAsync');


//Multer for uploading and storing profile pictures
const multer = require('multer');
const upload = multer({ dest: 'public/imgs' })


router.get('/users', isLogedIn,  isAdmin, renderUsersPage)

router.put('/users/:id/admin', isLogedIn, isAdmin, makeAnAdmin)

router.route('/register')
  .get(renderRegisterForm)
  .post(upload.single('profilePic'), validateUser, createUser)

router.get('/verify/:id/:token', verifyUser)

router.route('/login')
  .get(renderLoginForm)
  .post(login)

router.post('/logout', logout)

module.exports = router;