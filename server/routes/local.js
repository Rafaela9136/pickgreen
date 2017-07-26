var express = require('express');
var router 	= express.Router();
var Local 	= require('../models/local.js');

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
			res.status(200).send({success: true, message: 'Local registrado.'});
		}
	});
});

router.get('/', function(req, res) {
	if (req.query.cidade != null) {
		var result = findByCity(req.query.cidade);
		if (result.success == true) {
			res.status(200).json(result.locais);
		}
	} else {
		res.status(400).send('Query not found.');
	}
});

/* Util methods */

var findByCity = function(cidade) {
	Local.find({'endereco': {'cidade': cidade}}, function(err, locais) {
		if (err) {
			return {success: false, locais: locais};
		} else {
			return {success: true, locais: locais};
		}
	});
};

module.exports = router;