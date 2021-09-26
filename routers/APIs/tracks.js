const express = require('express')

const tracksRouter = express.Router({ mergeParams: true })

tracksRouter.get('/', (req, res) => res.json({ message: `Getting all tracks of album ${req.albumId}` }))
tracksRouter.get('/:trackId', (req, res) => res.json({ message: `Getting track with id ${req.params.trackId} of album with id ${req.params.albumId}` }))
tracksRouter.post('/:trackId', (req, res) => res.json({ message: `Posting track with id ${req.params.trackId} of album with id ${req.params.albumId}` }))

// Exporting the tracks router
module.exports = tracksRouter