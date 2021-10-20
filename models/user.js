const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type: String,
    required: true,
    min:3,
    max: 25,
    unique:true
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  profilePic :{
    type: String
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', userSchema);

