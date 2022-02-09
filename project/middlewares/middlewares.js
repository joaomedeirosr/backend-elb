var jwt = require("jsonwebtoken");

exports.autenticacao = (req, res, next) => {
  var token = req.headers.auth;
  jwt.verify(token, "12646", (err, decoded) => {
    if (err) {
      console.log("Erro ao validar o token!!" + err);
      return res
        .status(403)
        .send({ mensagem: "Nao foi possível validar o token!!" });
    } else {
      next();
    }
  });
};
