const express = require('express')
// Requring the Sub-Routers
const albumsRouter = require('./APIs/albums')

const router = express.Router()

router.get('/', (_req, res) =>
    res.status(200).json({
        message: 'Welcome to The Music API APP'
    }))

router.use('/api/albums', albumsRouter)

// Exporting the main router
module.exports = router