// Importacoes ou requires
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// Importando o Mongoose que faz a conversa com o Banco MongoDB
var mongoose = require("mongoose");

var Contatos = require("./models/contatos");
var middlewares = require("./middlewares/middlewares");

// Importando a Rota Contatos
var routeContatos = require("./routes/contatos");
var routeUsuario = require("./routes/usuarios");

// URL do nosso cluster direto do Mongoose formato (user:password)
var url =
  "mongodb+srv://123:123@cluster0.nzcul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = { useNewUrlParser: true };
mongoose.connect(url, options);

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

// ---> Criando uma API de Contatos com arquitetura CRUD <----

// Create ( C )

// Read ( R )

// Update ( U )

// Delete ( D )

// Instanciando o express
const app = express();

app.use(express.json());

app.use(express.static("public"));

// Faz a chamada da rota
app.use("/usuarios", routeUsuario);
app.use("/contatos", middlewares.autenticacao, routeContatos);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 3000);

module.exports = app;

// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Servidor web com node!");
