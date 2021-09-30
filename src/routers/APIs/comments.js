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

commentsRouter.get('/', jwt.required, commentController.getAllComments)
commentsRouter.post('/', jwt.required, commentController.createComment)

commentsRouter.get('/:commentId', jwt.required, commentController.geComment)
commentsRouter.put('/:commentId', jwt.required, commentController.updateComment)
commentsRouter.delete('/:commentId', jwt.required, commentController.deleteComment)

// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/
commentsRouter.all('/', function (_req, res) { res.status(405).json({ success: "false", message: 'Method Not Allowed' }) })
// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/{commentId}
commentsRouter.all('/:commentId', function (_req, res) { res.status(405).json({ success: "false", message: 'Method Not Allowed' }) })


// Exporting the comments router
module.exports = commentsRouter