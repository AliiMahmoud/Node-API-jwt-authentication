// requiring the comment model
const commentModel = require('../models/comment/comment');
const movieModel = require('../models/movie/movie');
const { ObjectID } = require('bson');
// requiring the comment's data validator
const commentSchema = require('../models/comment/commentSchema');

/**
 * Middleware function to `GET` all **Comments** from MongoDB 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.getAllComments = async function (req, res) {
    try {
        let movie_id = ObjectID(req.params.movieId)
        let comments = await commentModel.getMovieComments({ movie_id })
        if (comments == null)
            res.status(500).json({ success: "false", message: "Something went wrong" })
        else
            res.status(200).json({ success: "true", message: "Getting all comments", data: comments })
    } catch (err) {
        res.status(404).json({ success: "false", message: "No such movie" })
    }
}

/**
 * Middleware function to handle **Comment** `creation`. 
 * and add this to the database after validating it 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.createComment = async function (req, res) {
    try {
        let movie_id = ObjectID(req.params.movieId)

        // extract the token payload and decode it to get user's email
        let tokenPayload = JSON.parse(Buffer.from(req.headers.authorization.split(' ')[1].split('.')[1], "base64").toString())

        let comment = {}
        comment.text = req.body.text
        comment.email = tokenPayload.email
        comment.date = new Date().toISOString()
        // Adding the movie Id to the comment - Referencial key
        comment.movie_id = movie_id

        // checking if it was invalid movieId
        let movie = await movieModel.getMovie({ _id: movie_id })
        if (movie == null) {
            res.status(404).json({ success: "false", message: 'Movie not found' })
        }
        else {
            // // validating the comment data fields
            let { error } = commentSchema.validate(comment)
            if (error) {
                res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
            }
            else {
                let inserted = await commentModel.insertComment(comment)
                if (inserted.acknowledged)
                    res.status(201).json({ success: "true", message: 'comment created successfully', data: comment })
                else
                    res.status(500).json({ success: "false", message: 'Something went wrong!' })
            }
        }
    } catch (err) { res.status(404).json({ success: "false", message: 'Movie not found' }) }
}

/**
 * Middleware function to `get a comment` by its `id`. 
 * it extracts the Id of the comment from the path(`params`)
 * and sends it in a `JSON` response or 404 if it does'nt exsit
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.geComment = async function (req, res) {

    let { commentId } = req.params
    let _id = ObjectID(commentId)
    let comment = await commentModel.getComment({ _id })
    if (comment == null)
        res.status(404).json({ success: "false", message: "Can't find the comment" })
    else
        res.status(200).json({ success: "true", message: "Comment found", data: comment })
}

/**
 * Middleware function to handle `updating` a **comment**. 
 * it extracts the Id of the comment from the path(`params`)
 * and add it to the database after validation 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.updateComment = async function (req, res) {
    try {
        let movie_id = ObjectID(req.params.movieId)
        let commentId = ObjectID(req.params.commentId)

        // extract the token payload and decode it to get user's email
        let tokenPayload = JSON.parse(Buffer.from(req.headers.authorization.split(' ')[1].split('.')[1], "base64").toString())

        var comment = {}
        comment.text = req.body.text
        comment.email = tokenPayload.email
        comment.date = new Date().toISOString()
        // Adding the movie Id to the comment - Referencial key
        comment.movie_id = movie_id

        // checking if it was invalid movieId
        let movie = await movieModel.getMovie({ _id: movie_id })
        if (movie == null) {
            res.status(404).json({ success: "false", message: 'Not found' })
        }
        else {
            // // validating the comment data fields
            let { error } = commentSchema.validate(comment)
            if (error) {
                res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
            }
            else {
                let isUpdated = await commentModel.updateComment({ _id: commentId }, comment)
                comment.id = req.params.commentId
                if (isUpdated == false)
                    res.status(404).json({ success: "false", message: 'Not found' })
                else if (isUpdated == null)
                    res.status(500).json({ success: "false", message: 'Something went wrong!' })
                else
                    res.status(200).json({ success: "true", message: 'comment updated successfully', data: comment })

            }
        }
    } catch (err) { res.status(404).json({ success: "false", message: 'Movie not found' }) }
}

/**
 * Middleware function to handle **comment** `deletion` by its `id`. 
 * it extracts the Id of the comment from the path(`params`)
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.deleteComment = async function (req, res) {
    let commentId = req.params.commentId
    let _id = ObjectID(commentId)
    let deleted = await commentModel.deleteComment({ _id })
    if (deleted == false)
        res.status(404).json({ success: "false", message: "Can't find the comment" })
    else if (deleted == null)
        res.status(500).json({ success: "false", message: "Something went wrong" })
    else
        res.status(200).json({ success: "true", message: "Comment deleted", data: deleted })
}
