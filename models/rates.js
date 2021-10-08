const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratesSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project' 
  },
  votes:{
    participant:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    criteria1: Number, 
    criteria2: Number, 
    criteria3: Number, 
    criteria4: Number, 
    criteria5: Number, 
    criteria6: Number, 
    criteria7: Number, 
    criteria8: Number, 
    criteria9: Number, 
    criteria10: Number,
    criteria11: Number, 
    criteria12:String,
    average:  String
  }
})

module.exports = mongoose.model('Rate', ratesSchema);