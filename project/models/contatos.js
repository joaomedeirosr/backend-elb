var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContatosSchema = new Schema({
  cpf: { type: String, require: true, unique: true },
  nome: { type: String, require: true },
  descricao: { type: String },
  dataCadastro: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Contato", ContatosSchema);
