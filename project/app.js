/*  Subindo o Express   */

const express = require("express");

// Instanciando o express
const app = express();
app.get("/", function (req, res) {
  console.log("Recebi o request");
  res.send("Parabéns servidor em funcionamento!");
});

// Aula 02 ---> Criando uma API  de Contatos <----

// Create ( C )
app.post("/contatos/", (req, res) => {
  // Código para que o método da API faca alguma coisa!
  var Contatos = req.body;
  console.log(req.body);

  return res.send({
    message: "Tudo ok com o metodo POST para registrar um novo usuário!",
    codigo: 200,
  });
});

// Read ( R )
app.get("/contatos:codigo/", (req, res) => {
  var parametro = req.params;
  console.log(parametro);
  return res.send({
    message:
      "Tudo ok com o método GET para consultar os usuários cadastrados!" +
      parametro.codigo,
  });
});

// Update ( U )
app.put("/contatos/", (req, res) => {
  return res.send({
    message:
      "Tudo ok com o método put para alterar o nome do usuário cadastrado!" +
      req.params.codigo,
  });
});

// Delete ( D )
app.delete("/contatos/", (req, res) => {
  return res.send({
    message:
      "Tudo ok com o método delete para deletar um usuário já cadastrado!" +
      req.params.codigo,
  });
});
app.listen(3000);
module.exports = app;
// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Meu primeiro servidor web com node!");
