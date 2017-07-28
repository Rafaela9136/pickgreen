var express = require('express');
var router 	= express.Router();
var bcrypt	= require('bcrypt');
var User 	= require('../models/user.js');
var apiKey 	= require('../config/apiKey.js');

// Index
router.get('/', function(req, res) {
	User.find({}, function(err, usuarios) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).json({success: true, result: usuarios});
		}
	});
});

// Create
router.post('/register', function(req, res) {
	var user 			= new User();
	user.name 			= req.body.name;
	user.email 			= req.body.email;
	user.dataNascimento = req.body.dataNascimento;
	user.sexo 			= req.body.sexo;
	if (req.body.pontos) user.pontos = req.body.pontos;
	user.telefone 		= req.body.telefone;
	if (req.body.endereco) user.endereco = req.body.endereco;
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if (err) {
			res.status(400).send(err);
		} else {
			user.password = hash;
			user.save(function(err) {
				if (err) {
					if (err.name === 'MongoError' && err.code === 11000) {
		        		// Duplicate username
		        		return res.status(400).send({ success: false, message: 'Usuário já existente.' });
		      		}
		      		// Some other error
		      		return res.status(400).send({ success: false, message: 'User validation error.' });
				} else {
					res.status(200).json({ success: true, message: user._id});
				}
			});
		}
	});
});

// Update
router.put('/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (req.body.name) user.name = req.body.name;
		if (req.body.email) user.email = req.body.email;
		if (req.body.dataNascimento) user.dataNascimento = req.body.dataNascimento;
		if (req.body.sexo) user.sexo = req.body.sexo;
		if (req.body.pontos) user.pontos = req.body.pontos;
		if (req.body.telefone) user.telefone = req.body.telefone;
		if (req.body.endereco) user.endereco = req.body.endereco;
		user.save(function(err) {
			if (err) {
				res.status(400).send({success: false, message: err});
			} else {
				res.status(200).send({success: true, message: "Usuário atualizado."})
			}
		});
	});
});

// Delete
router.delete('/:user_id', function(req, res) {
	User.remove({ _id: req.params.user_id }, function(err) {
		if (err) {
			res.status(400).send({success: false, message: err});
		} else {
			res.status(200).send({success: true, message: "Usuário removido."});
		}
	});
});

router.post('/auth', function(req, res) {
	User.findOne({'email': req.body.email}, function(error, user) {
		if (!user) {
			res.status(400).send({success: false, message: 'Usuário não encontrado.'});
		} else {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (err) {
					res.status(400).send(err);
				} else {
					if (result) {
						res.status(200).json({success: true, user: user});
					} else {
						res.status(400).json({success: false, message: 'Senha incorreta.'});
					}
				}
			});
		}
		
	});
});

module.exports = router;