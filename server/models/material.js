// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Material = new Schema({
  name: {
  	type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('materiais', Material);