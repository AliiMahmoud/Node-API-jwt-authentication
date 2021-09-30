// requiring the movie model 
const movieModel = require('../models/movie/movie');
const { ObjectID } = require('bson');
// requiring the movie's data validator
const movieSchema = require('../models/movie/movieSchema');

/**
 * Middleware function to **GET all** `movies` from MongoDB 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.getAllMovies = async function (_req, res) {
    let movies = await movieModel.getAllMovies()
    if (movies == null)
        res.status(500).json({ success: "false", message: "Something went wrong" })
    else
        res.status(200).json({ success: "true", message: "Getting all movies", data: movies })
}

/**
 * Middleware function to handle `movie creation` 
 * and add this to the database after validating it 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.createMovie = async function (req, res) {

    let movie = req.body
    // validating the movie data fields
    let { error } = movieSchema.validate(movie)
    if (error) {
        res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        let inserted = await movieModel.insertMovie(movie)
        if (inserted.acknowledged)
            res.status(201).json({ success: "true", message: 'movie created successfully', data: movie })
        else
            res.status(500).json({ success: "false", message: 'Something went wrong!' })
    }
}

/**
 * Middleware function to `get a movie` by its `id`  
 * it extracts the Id of the movie from the path(`params`)
 * and sends it in a `JSON` response or 404 if it does'nt exsit
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.getMovie = async function (req, res) {
    try {
        let movieId = req.params.movieId
        let _id = ObjectID(movieId)
        let movie = await movieModel.getMovie({ _id })
        if (movie == null)
            res.status(404).json({ success: "false", message: "Can't find the movie" })
        else
            res.status(200).json({ success: "true", message: "movie found", data: movie })
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the movie" })
    }
}

/**
 * Middleware function to handle `updating` a **movie** 
 * it extracts the `Id` of the movie from the path(`params`)
 * and add it to the database after validation 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.updateMovie = async function (req, res) {
    try {
        let movie = req.body
        // validating the movie data fields
        let { error } = movieSchema.validate(movie)
        if (error) {
            res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
        }
        else {
            let movieId = req.params.movieId
            let _id = ObjectID(movieId)
            let updated = await movieModel.updateMovie({ _id }, movie)
            movie._id = movieId
            if (updated == null)
                res.status(500).json({ success: "false", message: "Something went wrong" })
            else if (updated == false)
                res.status(404).json({ success: "false", message: "Can't find the movie" })
            else
                res.status(200).json({ success: "true", message: "movie updated", data: movie })
        }
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the movie" })
    }
}

/**
 * Middleware function to handle **movie** `deletion` by its `id`. 
 * it extracts the Id of the movie from the path(`params`)
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 * @todo Delete its comments
 */
module.exports.deleteMovie = async function (req, res) {
    try {
        let movieId = req.params.movieId
        let _id = ObjectID(movieId)
        let deleted = await movieModel.deleteMovie({ _id })
        if (deleted == false)
            res.status(404).json({ success: "false", message: "Can't find the movie" })
        else if (deleted == null)
            res.status(500).json({ success: "false", message: "Something went wrong" })
        else
            res.status(200).json({ success: "true", message: "Movie deleted", data: deleted })
    }
    catch (err) {
        res.status(404).json({ success: "false", message: "Can't find the movie" })
    }
}
