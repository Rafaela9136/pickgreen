// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Administrador = new Schema({
  pin: {
  	type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('administradores', Administrador);