// JOI schema
const {projectSchema, userSchema} = require('./schemas');
const ExpressError = require('./ExpressError');
const User = require('./models/user');

module.exports.isAdmin = async(req, res, next) => {
  const id = req.session.user_id
  const user = await User.findById(id)
  if(user.isAdmin){
    next()
  }
  else{
    const msg = "You don't have permission"
    req.flash('error', msg)
    return res.redirect('/projects')
  }
}

module.exports.isLogedIn = (req, res, next) => {
  if(!req.session.user_id){
    return res.redirect('/login')
  }
  next()
}

module.exports.isVerified = async (req, res, next) => {
  const user = await User.findById(req.session.user_id)
  if(!user.verified) {
      req.flash('error','Please validate your e-mail adress')
      return res.redirect('/login')
    }
  next()
}


module.exports.validateProject = (req, res, next) => {
  const {error} = projectSchema.validate(req.body)
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }else {
    next()
  }
}

module.exports.validateUser = (req, res, next) => {
  const {error} = userSchema.validate(req.body)
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }else{
    next()
  }
}
