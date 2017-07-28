// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Evento = new Schema({
  _local: { type: Schema.Types.ObjectId, ref: './local.js' },
  descricao: {
  	type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  ended: {
  	type: Date
  }
});

module.exports = mongoose.model('eventos', Evento);