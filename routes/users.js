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

router.get('/users', isLogedIn,  isAdmin, renderUsersPage)

router.put('/users/:id/admin', isLogedIn, isAdmin, makeAnAdmin)

router.route('/register')
  .get(renderRegisterForm)
  .post(validateUser, createUser)

router.get('/verify/:id/:token', verifyUser)

router.route('/login')
  .get(renderLoginForm)
  .post(login)

router.post('/logout', logout)

module.exports = router;