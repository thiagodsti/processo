var express = require('express');
var Processo = require('./entity.js');
var router = express.Router();              // get an instance of the express Router

//create a new instance of processos (accessed at POST http://localhost:8080/api/processos).
router.post('', function(req, res) {
  var processo = new Processo();      // create a new instance of the Processo model
  processo.processo = req.body.processo;  // set the processos name (comes from the request)
	processo.fiscal = req.body.fiscal;
  // save the processo and check for errors
  processo.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Processo criado!' });
  });
});

// get all the processos (accessed at GET http://localhost:8080/api/processos).
router.get('', function(req, res) {
  Processo.find(function(err, processos) {
    if (err) {
      res.send(err);
    }
    res.json(processos);
  });
});


// findById on routes that end in /processos/:processo_id
router.get('/:processo_id', function(req, res) {
  Processo.findById(req.params.processo_id, function(err, processo) {
    if (err) {
      res.send(err);
    }
    res.json(processo);
  });
});

// update the processo with this id (accessed at PUT http://localhost:8080/api/processos/:processo_id)
router.put('/:processo_id', function(req, res) {
  // use our processo model to find the processo we want
  Processo.findById(req.params.processo_id, function(err, processo) {
    if (err) {
      res.send(err);
    }
    processo.processo = req.body.processo;
    processo.fiscal = req.body.fiscal;

    // save the processo
    processo.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Processo atualizado!' });
    });
  });
});

// delete the prcesso with this id (accessed at DELETE http://localhost:8080/api/processos/:processo_id)
router.delete('/:processo_id', function(req, res) {
  Processo.remove({
    _id: req.params.processo_id
  }, function(err, processo) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Processo deletado com sucesso.' });
  });
});

module.exports = router;
