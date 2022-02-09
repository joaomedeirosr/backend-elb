var jwt = require("jsonwebtoken");

var Usuarios = require("../models/contatos");

exports.token = (req, res) => {
  var codigo = req.params.codigo;

  Usuarios.find({ codigo }, (err, data) => {
    if (!err) {
      var token = jwt.sign({ id: codigo }, "", { expiresIn: "30m" });
      return res.status(200).send({ token: token });
    } else {
      return res.status(500).send(err);
    }
  });
};
