// let sample = {
//     "title": "Winsor McCay, the Famous Cartoonist of the N.Y. Herald and His Moving Comics",
//     "plot": "Cartoon figures announce, via comic strip balloons, that they will move - and move they do, in a wildly exaggerated style.",
//     "cast": [
//         "Winsor McCay"
//     ]
// }

const Joi = require('joi')
// movie model schema
module.exports = Joi.object({
    title: Joi.string().required().trim(),
    plot: Joi.string().required().trim(),
    cast: Joi.array().items(Joi.string())
})