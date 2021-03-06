///////////////////////////////////////
//          /api/theaters 
//////////////////////////////////////

const express = require('express')
// Token verification Middleware
var jwt = require('../../middlewares/auth');
// Importing the theaters Controller
const theaterController = require('../../controllers/theater')

// Theaters's main routes Handler
const theatersRouter = express.Router()

theatersRouter.get('/', jwt.required, theaterController.getAllTheaters)
theatersRouter.post('/', jwt.required, theaterController.createTheater)

theatersRouter.get('/:theaterId', jwt.required, theaterController.getTheater)
theatersRouter.put('/:theaterId', jwt.required, theaterController.updateTheater)
theatersRouter.delete('/:theaterId', jwt.required, theaterController.deleteTheater)


// Sending Method Not Allowed for other methods associated with /api/theaters/
theatersRouter.all('/', function (_req, res) { res.status(405).json({ success: "false", status: 405, message: 'Method Not Allowed' }) })
// Sending Method Not Allowed for other methods associated with /api/theaters/{theaterId}
theatersRouter.all('/:theaterId', function (_req, res) { res.status(405).json({ success: "false", message: 'Method Not Allowed' }) })


// Exporting the theaters router
module.exports = theatersRouter