// JOI schema
const {projectSchema} = require('./schemas');
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

module.exports.validateProject = (req, res, next) => {
  const {error} = projectSchema.validate(req.body)
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }else {
    next()
  }
}