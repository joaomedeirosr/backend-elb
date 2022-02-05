// Importacoes ou requires
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// Importando o Mongoose que faz a conversa com o Banco MongoDB
var mongoose = require("mongoose");

var Contatos = require("./models/contatos");

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

app.get("/", function (req, res) {
  console.log("Recebi o request");
  res.send("Parabéns servidor em funcionamento!");
});

// ---> Criando uma API de Contatos com arquitetura CRUD <----

// Create ( C )
app.post("/contatos/", (req, res) => {
  // Código para que o método da API faca alguma coisa!

  var codigo = req.body.codigo;

  if (req.body.descricao == undefined || req.body.descricao == "") {
    return res.status(500).send({
      message: "O Contato deve fornecer uma breve descricao",
    });
  }

  Contatos.create(req.body, (err, data) => {
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
});

// Read ( R )
app.get("/contatos:codigo/", (req, res) => {
  var parametro = req.params;
  Contatos.find({}, (err, data) => {
    return res.status(200).send(data);
  });
});

// Update ( U )
app.put("/contatos:codigo/", (req, res) => {
  var contatos = req.body;

  Contatos.findOneAndDelete({ codigo }, { $set: req.body }, (err, data) => {
    return res
      .status(201)
      .send({ message: "O nome do contato foi alterado com sucesso!" });
  });
});

// Delete ( D )
app.delete("/contatos/", (req, res) => {
  var codigo = req.params.codigo;

  Contatos.findOneAndDelete({}, () => {
    return res.status(200).send({ message: "Contato excluído com sucesso!" });
  });
});

app.use(express.static("public"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3000);
module.exports = app;

// Fica escutando a porta padrao ou seja a porta local(Servidor Local)

console.log("Servidor web com node!");
