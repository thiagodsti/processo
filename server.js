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

var Processo     = require('./app/models/processo');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/processos')
    // create a processo (accessed at POST http://localhost:8080/api/processos)
    .post(function(req, res) {
        
        var processo = new Processo();      // create a new instance of the Processo model
        processo.processo = req.body.processo;  // set the processos name (comes from the request)
		processo.fiscal = req.body.fiscal;

        // save the processo and check for errors
        processo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Processo criado!' });
        });
        
    })
	 // get all the processos (accessed at GET http://localhost:8080/api/processos)
    .get(function(req, res) {
        Processo.find(function(err, processos) {
            if (err)
                res.send(err);

            res.json(processos);
        });
    });
	
// on routes that end in /processos/:processo_id
// ----------------------------------------------------
router.route('/processos/:processo_id')
    // get the processo with that id (accessed at GET http://localhost:8080/api/processos/:processo_id)
    .get(function(req, res) {
        Processo.findById(req.params.processo_id, function(err, processo) {
            if (err)
                res.send(err);
            res.json(processo);
        });
    })
    // update the processo with this id (accessed at PUT http://localhost:8080/api/processos/:processo_id)
    .put(function(req, res) {

        // use our processo model to find the processo we want
        Processo.findById(req.params.processo_id, function(err, processo) {

            if (err)
                res.send(err);

            processo.processo = req.body.processo;  // update the processos info
			processo.fiscal = req.body.fiscal;

            // save the processo
            processo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Processo atualizado!' });
            });

        });
    })
    // delete the prcesso with this id (accessed at DELETE http://localhost:8080/api/processos/:processo_id)
    .delete(function(req, res) {
        Processo.remove({
            _id: req.params.processo_id
        }, function(err, processo) {
            if (err)
                res.send(err);

            res.json({ message: 'Processo deletado com sucesso.' });
        });
    });
	


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);