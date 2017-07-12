// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Local = new Schema({
  name: {
  	type: String
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
  _material: [{ type: Schema.Types.ObjectId, ref: './material.js' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('locais', Local);