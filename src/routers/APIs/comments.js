/////////////////////////////////////////
//     /api/movies/{movieId}/comments 
/////////////////////////////////////////

const express = require('express')
// Token verification Middleware
var jwt = require('../../middlewares/auth');
// Importing the comments Controller
const commentController = require('../../controllers/comment')

// comment's main routes Handler
// merge Params to pass the params from the parent router(movies)
const commentsRouter = express.Router({ mergeParams: true })

commentsRouter.get('/', jwt.optional, commentController.getAllComments)
commentsRouter.post('/', jwt.optional, commentController.createComment)

commentsRouter.get('/:commentId', jwt.optional, commentController.geComment)
commentsRouter.put('/:commentId', jwt.optional, commentController.updateComment)
commentsRouter.delete('/:commentId', jwt.optional, commentController.deleteComment)

// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/
commentsRouter.all('/', function (_req, res) { res.status(405).json({ success: "false", message: 'Method Not Allowed' }) })
// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/{commentId}
commentsRouter.all('/:commentId', function (_req, res) { res.status(405).json({ success: "false", message: 'Method Not Allowed' }) })


// Exporting the comments router
module.exports = commentsRouter