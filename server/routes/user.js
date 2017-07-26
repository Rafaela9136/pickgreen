var express = require('express');
var router 	= express.Router();
var bcrypt	= require('bcrypt');
var User 	= require('../models/user.js');
var apiKey 	= require('../config/apiKey.js');

router.post('/register', function(req, res) {
	var user 			= new User();
	user.name 			= req.body.name;
	user.email 			= req.body.email;
	user.dataNascimento = req.body.dataNascimento;
	user.sexo 			= req.body.sexo;
	user.pontos 		= req.body.pontos;
	user.telefone 		= req.body.telefone;
	user.endereco 		= req.body.endereco;
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
		      		return res.status(400).send({ success: false, message: 'User validation error' });
				} else {
					res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso.'});
				}
			});
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
						res.status(200).json({success: true, user: user, result: result});
					} else {
						res.status(400).json({success: false, message: 'Senha incorreta.'});
					}
				}
			});
		}
		
	});
});

module.exports = router;