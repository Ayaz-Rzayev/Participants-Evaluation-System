// const express = require('express');
// const router = express.Router();
// //Middleware
// const isLogedIn = require('../middleware')
// // Error handling
// const ExpressError = require('../ExpressError');
// const catchAsync = require('../catchAsync');
// // //Functions
// const avg = require('../functions');
// //Schemas
// const Rates = require('../models/rates');

// router.get('/:id/rates', isLogedIn, catchAsync(async(req, res, next) => {
//   const {id} = req.params
//   const rates = await Rates.find(id).populate('project').populate({path: 'project', populate:{path: 'pm'}}).populate('voter').populate('votes.participant').populate('votes')
//   //res.send(rates)
//   res.render('rates/rates', {rates})
// }))

// module.exports = router;