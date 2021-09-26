const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Functions
const avg = require('../functions');

const averageSchema = new Schema({
  project:{
    type: Schema.Types.ObjectId, ref: 'Project' 
  },
  participant: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  arrOfRates: [String]
})

module.exports = mongoose.model('Average', averageSchema)