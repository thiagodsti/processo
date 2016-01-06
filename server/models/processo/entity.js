var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProcessoSchema   = new Schema({
  processo: String,
	fiscal: String,
  ocorrencia: [{
    titulo: String,
    descricao: String
  }]
});

module.exports = mongoose.model('Processo', ProcessoSchema);
