/*  Subindo o Express   */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

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

  return res.status(201).send({
    message: "Tudo ok com o metodo POST para registrar um novo usuário!",
    codigo: 200,
  });
});

// Read ( R )
app.get("/contatos:codigo/", (req, res) => {
  var parametro = req.params;
  console.log(parametro);
  return res.status(200).send({
    message:
      "Tudo ok com o método GET para consultar os usuários cadastrados!" +
      parametro.codigo,
  });
});

// Update ( U )
app.put("/contatos:codigo/", (req, res) => {
  var contatos = req.body;

  console.log(contatos);

  return res.status(201).send({
    message:
      "Tudo ok com o método put para alterar o nome do usuário cadastrado!" +
      req.params.codigo,
  });
});

// Delete ( D )
app.delete("/contatos/", (req, res) => {
  return res.status(200).send({
    message:
      "Tudo ok com o método delete para deletar um usuário já cadastrado!" +
      req.params.codigo,
  });
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3000);
module.exports = app;
// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Meu primeiro servidor web com node!");
