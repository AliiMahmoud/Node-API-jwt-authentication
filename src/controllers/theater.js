// requiring the theater model
const theaterModel = require('../models/theater/theater');
const { ObjectID } = require('bson');
// requiring the theater's data validator
const theaterSchema = require('../models/theater/theaterSchema');

/**
 * Middleware function to *GET* all Theaters from MongoDB 
 * and sends a JSON response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.getAllTheaters = async function (_req, res) {
    let theaters = await theaterModel.getAllTheaters()
    if (theaters == null)
        res.status(500).json({ success: "false", message: "Something went wrong" })
    else
        res.status(200).json({ success: "true", message: "Getting all movies", data: theaters })
}

/**
 * Middleware function to handle Theater creation 
 * and add this to the database after validating it 
 * and sends a JSON response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.createTheater = async function (req, res) {

    let theater = req.body
    // validating the theater data fields
    let { error } = theaterSchema.validate(theater)
    if (error) {
        res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        let inserted = await theaterModel.insertTheater(theater)
        if (inserted.acknowledged)
            res.status(201).json({ success: "true", message: 'Theater created successfully', data: theater })
        else
            res.status(500).json({ success: "false", message: 'Something went wrong!' })
    }
}

/**
 * Middleware function to get a Theater by its id  
 * it extracts the Id of the Theater from the path(params)
 * and sends it in a JSON response or 404 if it does'nt exsit
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.getTheater = async function (req, res) {
    try {
        let theaterId = req.params.theaterId
        let _id = ObjectID(theaterId)
        let theater = await theaterModel.getTheater({ _id })
        if (theater == null)
            res.status(404).json({ success: "false", message: "Can't find the theater" })
        else
            res.status(200).json({ success: "true", message: "Theater found", data: theater })
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the movie" })
    }
}

/**
 * Middleware function to handle updating a Theater 
 * it extracts the Id of the Theater from the path(params)
 * and add it to the database after validation 
 * and sends a JSON response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.updateTheater = async function (req, res) {
    try {
        let theater = req.body
        // validating the theater data fields
        let { error } = theaterSchema.validate(theater)
        if (error) {
            res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
        }
        else {
            let theaterId = req.params.theaterId
            let _id = ObjectID(theaterId)
            let updated = await theaterModel.updateTheater({ _id }, theater)
            theater._id = theaterId
            if (updated == null)
                res.status(500).json({ success: "false", message: "Something went wrong" })
            else if (updated == false)
                res.status(404).json({ success: "false", message: "Can't find the theater" })
            else
                res.status(200).json({ success: "true", message: "theater updated", data: theater })
        }
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the theater" })
    }
}

/**
 * Middleware function to handle Theater deletion by its id. 
 * it extracts the Id of the Theater from the path(params)
 * and sends a JSON response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.deleteTheater = async function (req, res) {
    try {
        let theaterId = req.params.theaterId
        let _id = ObjectID(theaterId)
        let deleted = await theaterModel.deleteTheater({ _id })
        if (deleted == false)
            res.status(404).json({ success: "false", message: "Can't find the theater" })
        else if (deleted == null)
            res.status(500).json({ success: "false", message: "Something went wrong" })
        else
            res.status(200).json({ success: "true", message: "theater deleted", data: deleted })
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the movie" })
    }
}
