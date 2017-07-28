var express = require('express');
var router 	= express.Router();
var Local 	= require('../models/local.js');
var apiKey 	= require('../config/apiKey.js');

// Index
router.get('/', function(req, res) {
	Local.find({}, function(err, locais) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: locais});
		}
	});
});

// Show
router.get('/:local_id', function(req, res) {
	Local.findById(req.params.local_id, function(err, local) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: local});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var local 		= new Local();
	local.name 		= req.body.name;
	local.telefone 	= req.body.telefone;
	local.endereco 	= req.body.endereco;
	local._material = req.body._material;
	local.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: 'Local não registrado.'});
		} else {
			res.status(200).send({success: true, message: local._id});
		}
	});
});

// Update
router.put('/:local_id', function(req, res) {
	Local.findById(req.params.local_id, function(err, local) {
		if (req.body.name) local.name 			= req.body.name;
		if (req.body.telefone) local.telefone 	= req.body.telefone;
		if (req.body.endereco) local.endereco 	= req.body.endereco;
		if (req.body._material) local._material = req.body._material;
		local.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Local atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:local_id', function(req, res) {
	Local.remove({ _id: req.params.local_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Local removido."});
		}
	});
});

router.get('/query/fields', function(req, res) {
	if (req.query.cidade != null) {
		findLocalByCity(req.query.cidade, function(result) {
			if (result.success == true) {
				res.status(200).json(result);
			} else {
				res.status(400).send(result);
			}
		});
	} else {
		res.status(400).send({success: false, message: 'Query not found.'});
	}
});

/* Query methods */

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