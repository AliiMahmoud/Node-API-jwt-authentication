const Joi = require('joi')

// User model schema for validation
const userSchema = Joi.object({
    username: Joi.string().required().trim().min(3),
    password: Joi.string().required().trim().min(8)
})

module.exports = userSchema