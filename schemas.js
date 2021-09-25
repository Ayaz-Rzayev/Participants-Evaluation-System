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