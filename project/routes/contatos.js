var rotas_contatos = require("express");
var router = rotas_contatos.Router();

var controller = require("../controllers/contatos");

// Criando as rotas
router.post("/", controller.incluir_contato);
router.get("/", controller.consultar_contato);
router.get("/:codigo", controller.consultar_contato_codigo);
router.put("/:codigo", controller.alterar_contato);
router.delete("/:codigo", controller.excluir_contato);

module.exports = router;
