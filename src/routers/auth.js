///////////////////////////////////////
//          /api/users
//////////////////////////////////////

// Express to handle routes
const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()

// Create User - register and send the token in json 
router.post('/', userController.register)
// Login user and send the token in json 
router.post('/login', userController.login)

// Exporting the auth router
module.exports = router