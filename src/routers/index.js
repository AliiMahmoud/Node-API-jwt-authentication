const express = require('express')
// Requring the Sub-Routers
const moviesRouter = require('./APIs/movies')
const theatersRouter = require('./APIs/theaters')
const authRouter = require('./auth')

const router = express.Router()

router.get('/', (_req, res) => res.status(200).json({ message: 'Welcome to The Music API APP' }))


// API Routes

// API Movies Starting end-point
router.use('/api/movies', moviesRouter)
// API theater Starting end-point
router.use('/api/theaters', theatersRouter)
// API Auth
router.use('/api/users', authRouter)


// Exporting the main router
module.exports = router
