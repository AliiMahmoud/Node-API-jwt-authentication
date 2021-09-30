///////////////////////////////////////
//          /api/movies 
//////////////////////////////////////

const express = require('express')
// Requring the Sub-Routers
const commentsRouter = require('./comments')
// Token verification Middleware
var jwt = require('../../middlewares/auth');
// Importing the Movies Controller
const movieController = require('../../controllers/movie')

// Movie's main routes Handler
const moviesRouter = express.Router()

moviesRouter.get('/', jwt.optional, movieController.getAllMovies)
moviesRouter.post('/', jwt.optional, movieController.createMovie)

moviesRouter.get('/:movieId', jwt.optional, movieController.getMovie)
moviesRouter.put('/:movieId', jwt.optional, movieController.updateMovie)
moviesRouter.delete('/:movieId', jwt.optional, movieController.deleteMovie)


// Sending Method Not allowed for other methods associated with /api/movies/
moviesRouter.all('/', function (_req, res) { res.status(405).json({ success: "false", message: 'Method not allowed' }) })
// Sending Method not allowed for other methods associated with /api/movies/{movieId}
moviesRouter.all('/:movieId', function (_req, res) { res.status(405).json({ success: "false", message: 'Method not allowed' }) })

// sub-routes that requires to fetch comments
moviesRouter.use('/:movieId/comments', commentsRouter);

// Exporting the movies router
module.exports = moviesRouter