var express 		= require('express');
var router 			= express.Router();
var Administrador 	= require('../models/administrador.js');
var apiKey 			= require('../config/apiKey.js');
var gpin			= require('generate-pincode');

// Index
router.get('/', function(req, res) {
	Administrador.find({}, function(err, administradores) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: administradores});
		}
	});
});

// Show
router.get('/:administrador_id', function(req, res) {
	Administrador.findById(req.params.administrador_id, function(err, administrador) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: administrador});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var administrador = new Administrador();
	administrador.pin = gpin(8);
	administrador.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Administrador registrado.", pin: administrador.pin});
		}
	});
});

// Update
/*router.put('/:administrador_id', function(req, res) {
	Administrador.findById(req.params.administrador_id, function(err, administrador) {
		// do stuff
		administrador.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Administrador atualizado."})
			}
		});
	});
});*/

// Delete
router.delete('/:administrador_id', function(req, res) {
	Administrador.remove({ _id: req.params.administrador_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Administrador removido."});
		}
	});
});


module.exports = router;
