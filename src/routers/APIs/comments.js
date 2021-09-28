/////////////////////////////////////////
//     /api/movies/{movieId}/comments 
/////////////////////////////////////////
const express = require('express')

// Token verification Middleware
var jwt = require('../../middlewares/auth');

// merge Params to pass the params from the parent router(movies)
const commentsRouter = express.Router({ mergeParams: true })

commentsRouter.get('/', jwt.optional, (req, res) => res.json({ message: `Get all comments of movieId  ${req.params.movieId}` }))
commentsRouter.post('/', jwt.optional, (req, res) => res.json({ message: `Post a comment for movieId ${req.params.movieId}` }))

commentsRouter.get('/:commentId', jwt.optional, (req, res) => res.json({ message: `Get comment with id ${req.params.commentId} of movie with id ${req.params.movieId}` }))
commentsRouter.put('/:commentId', jwt.optional, (req, res) => res.json({ message: `Put comment with id ${req.params.commentId} of movie with id ${req.params.movieId}` }))
commentsRouter.delete('/:commentId', jwt.optional, (req, res) => res.json({ message: `Delete comment with id ${req.params.commentId} of movie with id ${req.params.movieId}` }))


// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/
commentsRouter.all('/', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })
// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}/comments/{commentId}
commentsRouter.all('/:commentId', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })


// Exporting the comments router
module.exports = commentsRouter