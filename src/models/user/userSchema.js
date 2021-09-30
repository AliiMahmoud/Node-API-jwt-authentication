const Joi = require('joi')

/** User model schema for validating the registeration */
module.exports.register = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim().min(8)
})

/** User model schema for login validation */
module.exports.login = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim()
})
