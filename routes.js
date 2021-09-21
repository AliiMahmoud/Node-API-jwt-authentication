const express = require('express')

const router = express.Router()

router.get('/', function (_, res) {
    res.status(200).json({
        message: "Hello World",
        status: 200
    })
})

// Exporting the routes
module.exports = router