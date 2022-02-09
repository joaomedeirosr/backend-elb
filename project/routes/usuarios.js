var usuarios = require("express");
var router = usuarios.Router();

var controller = require("../controllers/usuarios");

router.get("/token/:codigo", controller.token);

module.exports = router;
