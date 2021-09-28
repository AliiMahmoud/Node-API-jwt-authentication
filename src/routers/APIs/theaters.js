///////////////////////////////////////
//          /api/theaters 
//////////////////////////////////////
const express = require('express')

// Token verification Middleware
var jwt = require('../../middlewares/auth');

const theatersRouter = express.Router()

theatersRouter.get('/', jwt.optional, (_req, res) => res.json({ message: 'Getting all Theaters' }))
theatersRouter.post('/', jwt.optional, (_req, res) => res.json({ message: 'Create a theater' }))

theatersRouter.get('/:theaterId', jwt.optional, (req, res) => res.json({ message: `Getting theater with id ${req.params.theaterId}` }))
theatersRouter.put('/:theaterId', jwt.optional, (req, res) => res.json({ message: `Putting - updating theater with id ${req.params.theaterId}` }))
theatersRouter.delete('/:theaterId', jwt.optional, (req, res) => res.json({ message: `Deleting theater with id ${req.params.theaterId}` }))


// Sending Method Not Allowed for other methods associated with /api/theaters/
theatersRouter.all('/', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })
// Sending Method Not Allowed for other methods associated with /api/theaters/{theaterId}
theatersRouter.all('/:theaterId', function (_req, res) { res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } }) })


// Exporting the theaters router
module.exports = theatersRouter