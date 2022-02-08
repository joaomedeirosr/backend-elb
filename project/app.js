// Importacoes ou requires
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// Importando o Mongoose que faz a conversa com o Banco MongoDB
var mongoose = require("mongoose");

var Contatos = require("./models/contatos");

// Importando a Rota Contatos
var routeContatos = require("./routes/contatos");

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

// Instanciando o express
const app = express();

app.use(express.json());

app.get("/", function (req, res) {});

// ---> Criando uma API de Contatos com arquitetura CRUD <----

// Create ( C )
app.post("/contatos/", (req, res) => {});

// Read ( R )
app.get("/contatos:codigo/", (req, res) => {});

// Update ( U )
app.put("/contatos:codigo/", (req, res) => {});

// Delete ( D )
app.delete("/contatos/", (req, res) => {});

app.use(express.static("public"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3000);
module.exports = app;

// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Servidor web com node!");
