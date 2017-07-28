// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: {
  	type: String
  },
  email: {
  	type: String,
  	lowercase: true,
    unique: true
  },
  dataNascimento: {
  	type: Date
  },
  sexo: {
  	type: String
  },
  pontos: {
  	type: Number,
    default: 0
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
}, { runSettersOnQuery: true } );

module.exports = mongoose.model('users', User);