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
app.use(function (req, res, next) {
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
        console.log('Connected to DB Successfully')
        app.listen(port, () => console.log(`server is running on port ${port}`));
    })
    .catch((err) => console.log(err))