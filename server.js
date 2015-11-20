// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Mongodb
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/prefeitura');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
var processos = require('./server/models/processo/router.js');
app.use('/processos', processos);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
