const Joi = require('joi')

// User model schema for validating the registeration
module.exports.registerSchema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim().min(8)
})

// User model schema for login validation
module.exports.loginSchema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim()
})
