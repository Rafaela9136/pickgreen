var express 	= require('express');
var router 		= express.Router();
var Material 	= require('../models/material.js');
var apiKey 		= require('../config/apiKey.js');

// Index
router.get('/', function(req, res) {
	Material.find({}, function(err, materiais) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: materiais});
		}
	});
});

// Show
router.get('/:material_id', function(req, res) {
	Material.findById(req.params.material_id, function(err, material) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: material});
		}
	});
});

// Create
router.post('/', function(req, res) {
	var material = new Material();
	material.name = req.body.name;
	material.save(function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Material registrado."});
		}
	});
});

// Update
router.put('/:material_id', function(req, res) {
	Material.findById(req.params.material_id, function(err, material) {
		if (req.body.name) material.name = req.body.name;
		material.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Material atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:material_id', function(req, res) {
	Material.remove({ _id: req.params.material_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Material removido."});
		}
	});
});


module.exports = router;