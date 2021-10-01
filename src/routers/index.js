const express = require('express')
// Requring the Sub-Routers
const moviesRouter = require('./APIs/movies')
const theatersRouter = require('./APIs/theaters')
const authRouter = require('./auth')
// Importing Swagger for API Documentation
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const options = require('../../_docs/swagger-api-options.json')

const router = express.Router()

// API Routes

// API Movies Starting end-point
router.use('/api/movies', moviesRouter)
// API theater Starting end-point
router.use('/api/theaters', theatersRouter)
// API Auth
router.use('/api/users', authRouter)


// API Documentation route
const specs = swaggerJsdoc(options);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true, customSiteTitle: 'API Documentation' })
);



// Exporting the main router
module.exports = router
