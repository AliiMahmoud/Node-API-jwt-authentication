// Require Express to run server and Routes
const express = require('express')
// Dependencies
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const database = require('./db')
const router = require('./server/routers/app-main-router')


// Start up an instance of the app
const app = express()

// Setting the view engine 
app.set('view engine', 'ejs')

// Middle-wares 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(router);

// Initializing the Project Main Folder 
app.use(express.static(path.join(__dirname, './public')))

// Setup Server 
const port = process.env.PORT || 8080;

// Connecting to the database then firing the server
database.connect()
    .then(() => {
        console.log('Connected to DB')
        app.listen(port, () => console.log(`server is running on port ${port}`));
    })
    .catch((err) => console.log(err))