const Joi = require('joi')

module.exports.projectSchema = Joi.object({
  project: Joi.object({
  name: Joi.string().required(),
  projectId: Joi.string().required(),
  pm: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
  sponsor: Joi.string().required(),
  priority: Joi.number().required().min(1).max(10),
  participants: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required()
  }).required()
})

module.exports.userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profilePic: Joi.string()
  }).required()
})
