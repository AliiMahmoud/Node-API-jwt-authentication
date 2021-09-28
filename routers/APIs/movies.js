///////////////////////////////////////
//          /api/movies 
//////////////////////////////////////
const express = require('express')

// Requring the Sub-Routers
const commentsRouter = require('./comments')

// Token verification Middleware
var jwt = require('../../middlewares/auth');

const moviesRouter = express.Router()

moviesRouter.get('/', jwt.optional, (_req, res) => res.json({ message: 'Getting all Movies' }))
moviesRouter.post('/', jwt.optional, (_req, res) => res.json({ message: 'Create a movie' }))

moviesRouter.get('/:movieId', jwt.optional, (req, res) => res.json({ message: `Getting movie with id ${req.params.movieId}` }))
moviesRouter.put('/:movieId', jwt.optional, (req, res) => res.json({ message: `Putting - updating movie with id ${req.params.movieId}` }))
moviesRouter.delete('/:movieId', jwt.optional, (req, res) => res.json({ message: `Deleting movie with id ${req.params.movieId}` }))


// Sending Method Not Allowed for other methods associated with /api/movies/
moviesRouter.all('/', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })
// Sending Method Not Allowed for other methods associated with /api/movies/{movieId}
moviesRouter.all('/:movieId', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })

// sub-routes that requires to fetch comments
moviesRouter.use('/:movieId/comments', commentsRouter);

// Exporting the movies router
module.exports = moviesRouter