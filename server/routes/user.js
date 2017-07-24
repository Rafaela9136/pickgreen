var express = require('express');
var router 	= express.Router();
var User 	= require('../models/user.js');

router.post('/register', function(req, res) {
	var user 			= new User();
	user.name 			= req.body.name;
	user.email 			= req.body.email;
	user.dataNascimento = req.body.dataNascimento;
	user.sexo 			= req.body.sexo;
	user.pontos 		= req.body.pontos;
	user.telefone 		= req.body.telefone;
	user.endereco 		= req.body.endereco;
	user.password 		= req.body.password;
	user.save(function(err) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
        		// Duplicate username
        		return res.status(400).send({ success: false, message: 'Usuário já existente.' });
      		}
      		// Some other error
      		return res.status(500).send({ success: false, message: 'User validation error' });
		} else {
			res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso.'});
		}
	});
});

router.post('/login', function(req, res) {
	User.findOne({'email': req.body.email}, function(error, user) {
		if (!user) res.status(404).send('Usuário não encontrado.');
		if (user.password == req.body.password) {
			res.status(200).json(user);
		} else {
			res.status(400).send('Senha incorreta.');
		};
	});
});

module.exports = router;