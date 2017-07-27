var express 	= require('express');
var router 		= express.Router();
var Coletor 	= require('../models/coletor.js');
var apiKey 		= require('../config/apiKey.js');
var gpin		= require('generate-pincode');

// Index
router.get('/', function(req, res) {
	Coletor.find({}, function(err, coletores) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: coletores});
		}
	});
});

// Show
router.get('/:coletor_id', function(req, res) {
	Coletor.findById(req.params.coletor_id, function(err, coletor) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: coletor});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var coletor = new Coletor();
	coletor.name 		= req.body.name;
	coletor.cnpj 		= req.body.cnpj;
	coletor.telefone 	= req.body.telefone;
	coletor.pin 		= gpin(8);
	coletor.endereco	= req.body.endereco;
	coletor.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Coletor registrado."});
		}
	});
});

// Update
router.put('/:coletor_id', function(req, res) {
	Coletor.findById(req.params.coletor_id, function(err, coletor) {
		if (req.body.name) coletor.name 		= req.body.name;
		if (req.body.cnpj) coletor.cnpj 		= req.body.cnpj;
		if (req.body.telefone) coletor.telefone = req.body.telefone;
		if (req.body.endereco) coletor.endereco = req.body.endereco;
		coletor.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Coletor atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:coletor_id', function(req, res) {
	Coletor.remove({ _id: req.params.coletor_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Coletor removido."});
		}
	});
});


module.exports = router;