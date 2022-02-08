var Contatos = require("../models/contatos");

exports.incluir_contato = (req, res) => {
  var codigo = req.body.codigo;

  if (req.body.descricao == undefined || req.body.descricao == "") {
    return res.status(500).send({
      message: "O Contato deve fornecer uma breve descricao",
    });
  }

  Contatos.find({ codigo }, (err, data) => {
    console.log(data);
    if (data.length > 0) {
      return res.status(500).send({
        message: "Contato ja está cadastrado no Sistema Codigo:" + codigo,
      });
    } else {
      Contatos.create(req.body, (err, data) => {
        return res.status(201).send({
          message: "Tudo ok contato foi adicionado com sucesso!",
        });
      });
    }
  });
};

exports.consultar_contato = (req, res) => {
  var queryString = req.query;

  Contatos.find({}, (err, data) => {
    return res.status(200).send(data);
  });
};

exports.consultar_contato_codigo = (req, res) => {
  var parametro = req.params.codigo;
  Contatos.find({ codigo }, (err, data) => {
    return res.status(200).send(data);
  });
};

exports.alterar_contato = (req, res) => {
  var contato = req.body;
  var parametro = req.params.codigo;

  Contatos.findOneAndUpdate({ codigo }, { $set: req.body }, (err, data) => {
    return res.status(201).send({ message: "Contato alterado com sucesso!" });
  });
};

exports.excluir_contato = (req, res) => {
  var parametro = req.params.codigo;
  Contatos.findOneAndDelete({ codigo }, (err, data) => {
    return res.status(200).send({ message: "Contato excluído com sucesso" });
  });
};
