var express 	= require('express');
var router 		= express.Router();
var Deposito 	= require('../models/deposito.js');
var apiKey 		= require('../config/apiKey.js');

// Index
router.get('/', function(req, res) {
	Deposito.find({}, function(err, depositos) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: depositos});
		}
	});
});

// Show
router.get('/:deposito_id', function(req, res) {
	Deposito.findById(req.params.deposito_id, function(err, deposito) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: deposito});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var deposito = new Deposito();
	deposito._coletor 	= req.body._coletor;
	deposito._local 	= req.body._local;
	deposito._user 		= req.body._user;
	deposito._material 	= req.body._material;
	deposito.peso		= req.body.peso;
	if (req.body.confirmed) deposito.confirmed	= req.body.confirmed;
	if (req.body.status) deposito.status 		= req.body.status;
	deposito.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Deposito registrado."});
		}
	});
});

// Update
router.put('/:deposito_id', function(req, res) {
	Deposito.findById(req.params.deposito_id, function(err, deposito) {
		if (req.body._coletor) deposito._coletor 	= req.body._coletor;
		if (req.body._local) deposito._local 		= req.body._local;
		if (req.body._user) deposito._user 			= req.body._user;
		if (req.body._material) deposito._material 	= req.body._material;
		if (req.body.confirmed) deposito.confirmed	= req.body.confirmed;
		if (req.body.peso) deposito.peso			= req.body.peso;
		if (req.body.status) deposito.status 		= req.body.status;
		deposito.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Deposito atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:deposito_id', function(req, res) {
	Deposito.remove({ _id: req.params.deposito_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Deposito removido."});
		}
	});
});


module.exports = router;
