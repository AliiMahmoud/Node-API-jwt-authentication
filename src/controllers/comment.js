// requiring the comment model
const commentModel = require('../models/comment/comment');
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

}

/**
 * Middleware function to handle **Comment** `creation`. 
 * and add this to the database after validating it 
 * and sends a `JSON` response
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.createComment = async function (req, res) {
    let comment = req.body
    // Adding the movie Id to the comment - Referencial key
    comment.movie_id = req.params.movieId
    // validating the comment data fields
    let { error } = commentSchema.validate(comment)
    if (error) {
        res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        let inserted = await commentModel.insertComment(comment)
        if (inserted.acknowledged) {
            comment.id = inserted.insertedId
            res.status(201).json({ success: "true", message: 'comment created successfully', data: comment })
        }
        else
            res.status(500).json({ success: "false", message: 'Internal server error!' })
    }
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
    // let commentId = req.params.commentId
    // let comment = req.body
    // // Adding the movie Id to the comment - Referencial key
    // comment.movie_id = req.params.movieId
    // // validating the comment data fields
    // let { error } = commentSchema.validate(comment)
    // if (error) {
    //     res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    // }
    // else {
    //     res.status(200).json({ success: "false", message: "Not implemented" })
    //     // TODO - lessa fe haga henna | model.updateComment
    //     // Replace if exists and create if not
    //     // let newComment = await commentModel.updateComment({ id: commentId }, comment)
    //     // if (newComment == null)
    //     //     res.status(404).json({ success: "false", message: "Can't find the comment" })
    //     // else
    //     //     res.status(200).json({ success: "true", message: "Comment found", data: newComment })
    // }

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
    if (deleted == true)
        res.status(200).json({ success: "true", message: "Comment deleted" })
    else if (deleted == false)
        res.status(404).json({ success: "false", message: "Can't find the comment" })
    else
        res.status(500).json({ success: "false", message: "Internal server error" })
}
