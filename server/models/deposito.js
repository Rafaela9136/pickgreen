// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deposito = new Schema({
  _coletor: { type: Schema.Types.ObjectId, ref: './coletor.js' },
  _local: { type: Schema.Types.ObjectId, ref: './local.js' },
  _user: { type: Schema.Types.ObjectId, ref: './user.js' },
  _material: { type: Schema.Types.ObjectId, ref: './material.js' },
  created: {
    type: Date,
    default: Date.now
  },
  confirmed: {
    type: Date
  },
  peso: { 
    type: Number,
  },
  status: {
    type: ['validado', 'inválido', 'pendente'],
    default: 'pendente'
  }
});

module.exports = mongoose.model('depositos', Deposito);