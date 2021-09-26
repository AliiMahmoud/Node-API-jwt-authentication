const express = require('express')
// Requring the Sub-Routers
const tracksRouter = require('./tracks')

const albumsRouter = express.Router()


albumsRouter.get('/', (_req, res) => res.json({ message: 'Getting all Albums' }))
albumsRouter.get('/:albumId', (req, res) => res.json({ message: `Getting album with id ${req.params.albumId}` }))
albumsRouter.post('/:albumId', (req, res) => res.json({ message: `Posting album with id ${req.params.albumId}` }))

albumsRouter.use('/:albumId/tracks', tracksRouter);

// Exporting the albums router
module.exports = albumsRouter