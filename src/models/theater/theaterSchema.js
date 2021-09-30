// const sample = {
//     "name": "theater name",
//     "address": {
//         "street": "340 W Market",
//         "city": "Bloomington",
//         "state": "MN"
//     }
// }

const Joi = require('joi')
// Theater model schema
module.exports = Joi.object({
    name: Joi.string().required().trim(),
    address: Joi.object({
        street: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        state: Joi.string().required().trim()
    }).required()
})
