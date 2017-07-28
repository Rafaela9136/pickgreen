var express 	= require('express');
var router 		= express.Router();
var Evento 		= require('../models/evento.js');
var Local 		= require('../models/local.js');
var apiKey 		= require('../config/apiKey.js');

// Index
router.get('/', function(req, res) {
	Evento.find({}, function(err, eventos) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: eventos});
		}
	});
});

// Show
router.get('/:evento_id', function(req, res) {
	Evento.findById(req.params.evento_id, function(err, evento) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: evento});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var evento = new Evento();
	evento._local 		= req.body._local;
	evento.descricao	= req.body.descricao;
	if (req.body.created) evento.created = req.body.created;
	evento.ended		= req.body.ended;
	evento.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: evento._id});
		}
	});
});

// Update
router.put('/:evento_id', function(req, res) {
	Evento.findById(req.params.evento_id, function(err, evento) {
		if (req.body._local) evento._local 			= req.body._local;
		if (req.body.descricao) evento.descricao	= req.body.descricao;
		if (req.body.created) evento.created 		= req.body.created;
		if (req.body.ended) evento.ended			= req.body.ended;
		evento.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Evento atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:evento_id', function(req, res) {
	Evento.remove({ _id: req.params.evento_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Evento removido."});
		}
	});
});

/*router.get('/query/fields', function(req, res) {
	Evento.find({}, function(err, eventos) {
		if (req.query.cidade) {
			findLocalByCity(req.query.cidade, function(locais) {
				eventosFiltrados = [];
				locais.forEach(function(local){

				})
			})
		}
	});
});*/

var findLocalByCity = function(cidade, callback) {
	Local.find({'endereco.cidade': cidade}, function(err, locais) {
		if (err) {
			callback({success: false, message: err});
		} else {
			callback({success: true, message: locais});
		}
	});
};

module.exports = router;
