/*Medicos
api/medicos
 */

const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jws");
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require("../controllers/medicos");
const router = Router();

router.get("/",validarJWT, getMedicos);
router.post(
  "/",
  [
    validarJWT,
    check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos
  ],
  crearMedico
);
router.put('/:id',[
    
], actualizarMedico);
router.delete('/:id', borrarMedico);

module.exports = router;