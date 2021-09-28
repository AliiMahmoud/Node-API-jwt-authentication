// Require Express to run server and Routes
const express = require('express')
// Loading env variables
require("dotenv").config();
// Dependencies
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const database = require('./db')
const errorHandler = require('./middlewares/error-handler')
const router = require('./routers/index')


let isProduction = (process.env.NODE_ENV == 'production')

// Start up an instance of the app
const app = express()

// Setting the view engine 
app.set('view engine', 'ejs')

// Middle-wares 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'));
app.use(router);

/// catch 404 and forward to error handler
app.use(function (_req, res, _next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: err.message })
});

//  Error handler middleware
app.use(errorHandler)


// Initializing the Project Main Folder 
app.use(express.static(path.join(__dirname, './public')))

// Setup Server 
const port = process.env.PORT || 8080;

// Connecting to the database then firing the server
database.connect()
    .then(() => {
        console.log('Connected To DB Successfully Successfully')
        app.listen(port, () => console.log(`server is running on port ${port}`));
    })
    .catch((err) => {
        console.log("Could'nt connect to DB")
        if (!isProduction)
            console.log(err.stack)
        app.listen(port, () => console.log(`server is running on port ${port}`));
    })