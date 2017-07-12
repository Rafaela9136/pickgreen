// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Coletor = new Schema({
  name: {
  	type: String
  },
  cnpj: {
  	type: String
  },
  telefone: {
  	type: String
  },
  pin: {
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
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('coletores', Coletor);