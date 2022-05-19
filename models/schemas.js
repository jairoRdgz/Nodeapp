const  Joi = require("joi")

const schemas = {
  user: Joi.object().keys({
    name: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{8,30}$')).required(),
    lastname: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{8,30}$')).required(),
    username: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{8,30}$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    identification: Joi.string().alphanum().min(3).max(10).required(),
    active: Joi.string().alphanum().min(2).max(10).required(),
    token: [Joi.string(), Joi.number()]
  }),

  vehicule: Joi.object().keys({
    type: Joi.string().alphanum().min(3).max(10).required(),
    brand: Joi.string().alphanum().min(3).max(10).required(),
    model: Joi.string().alphanum().min(3).max(10).required(),
    year: Joi.string().alphanum().min(3).max(10).required(),
    plate: Joi.string().alphanum().min(6).max(6).required(),
    owner: Joi.string().alphanum().min(6).required(),
  })
}

module.exports = schemas