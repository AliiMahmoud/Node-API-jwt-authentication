/* Require Express to run server and Routes */
const express = require('express')

/* Dependencies */
const bodyParser = require('body-parser')
const path = require('path')
// Requiring the app routes
const router = require('./routes')


/* Start up an instance of the app */
const app = express()

/* Middle-wares */
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);

/* Initializing the Project Main Folder */
app.use(express.static(path.join(__dirname, './assets')))


/* Setup Server */
const port = process.env.PORT || 8080;
app.listen(port, listeningFunction);

// Callback for debugging
function listeningFunction() {
    console.log('server is running');
    console.log(`running on localhost:${port}`);
};