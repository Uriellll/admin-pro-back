const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jws");
const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");
const router = Router();
router.get("/:busqueda",validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion);

module.exports = router;