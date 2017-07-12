// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  name: {
  	type: String
  },
  email: {
  	type: String,
  	lowercase: true
  },
  dataNascimento: {
  	type: Date
  },
  sexo: {
  	type: Boolean
  },
  pontos: {
  	type: Number
  },
  telefone: {
  	type: String
  },
  endereco: {
  	rua: String,
  	complemento: String,
  	numero: Number,
  	bairro: String,
  	cidade: String,
  	estado: String,
  	cep: String
  },
  password: {
  	type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);