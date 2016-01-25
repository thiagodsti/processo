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
    descricao: String,
    data: {type: Date, default: Date.now }
  }],
  autuado: String,
  dataVisita: { type: Date, default: Date.now },
  dataCriacao: { type: Date, default: Date.now },
  dataUltimaAlteracao: { type: Date, default: Date.now },
  situacao: String,
  ocorrencias: [{
    data: { type: Date, default: Date.now },
    titulo: String,
    descricao: String,
    upload: String
  }]
});

ProcessoSchema.pre('save', function(next) {
  now = new Date();
  this.dataUltimaAlteracao = now;
  next();
});

module.exports = mongoose.model('Processo', ProcessoSchema);
