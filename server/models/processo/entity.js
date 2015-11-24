var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProcessoSchema   = new Schema({
  processo: String,
	fiscal: String
});

module.exports = mongoose.model('Processo', ProcessoSchema);
