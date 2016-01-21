var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProcessoSchema   = new Schema({
  processo: String,
	fiscal: {},
  tipoFiscalizacao: {},
  municipio: {},
  regularidade: Boolean,
  motivoRegularidade: String,
  irregularidades: [{
    titulo: {},
    descricao: String
  }],
  autuado: String,
  dataVisita: { type: Date, default: Date.now },
  dataCriacao: { type: Date, default: Date.now },
  situacao: String,
  ocorrencias: [{
    dataCriacao: { type: Date, default: Date.now },
    titulo: String,
    descricao: String,
    upload: String
  }]
});

module.exports = mongoose.model('Processo', ProcessoSchema);
