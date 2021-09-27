const express = require('express')
// Requring the Sub-Routers
const albumsRouter = require('./APIs/albums')
const authRouter = require('./auth')

const router = express.Router()

router.get('/', (_req, res) =>
    res.status(200).json({
        message: 'Welcome to The Music API APP'
    }))

// API Starting end-point
router.use('/api/albums', albumsRouter)
// API Auth
router.use('/api/users', authRouter)

// Exporting the main router
module.exports = router