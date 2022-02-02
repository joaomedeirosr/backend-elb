// Importacoes ou requires
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// Importando o banco de dados Mongoose
var mongoose = require("mongoose");

// URL do nosso cluster direto do Mongoose
var url =
  "mongodb+srv://123:123@cluster0.nzcul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url);

// Interacoes ou logs no console de que o Banco foi conectado
mongoose.connection.on("error", (erro) => {
  console.log("Erro ao conectar com o banco de dados!! " + erro);
});

mongoose.connection.on("disconnected", () => {
  console.log("Aplicação desconectou do banco de dados!!");
});

mongoose.connection.on("connected", () => {
  console.log("Conectado ao banco de dados!!");
});

// Instanciando o express
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  console.log("Recebi o request");
  res.send("Parabéns servidor em funcionamento!");
});

// Aula 2 ---> Criando uma API  de Contatos <----

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

app.use(express.static("public"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3000);
module.exports = app;

// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Servidor web com node!");
