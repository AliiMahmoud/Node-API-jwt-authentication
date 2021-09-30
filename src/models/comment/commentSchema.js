// let sample = {
//     "email": "mercedes_tyler@fakegmail.com",
//     "movie_id": "573a1390f29313caabcd4323",
//     "text": "Eius veritatis vero facilis quaerat fuga temporibus. Praesentium expedita sequi repellat id. Corporis minima enim ex. Provident fugit nisi dignissimos nulla nam ipsum aliquam.",
//     "date": "date"
// }

const Joi = require('joi')
// comment model schema
module.exports = Joi.object({
    email: Joi.string().required().email(),
    movie_id: Joi.any(),
    text: Joi.string().required().trim(),
    date: Joi.date().iso()
})