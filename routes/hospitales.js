/*Hospitales
api/hospitales
 */

const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jws");
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require("../controllers/hospitales");
const router = Router();

router.get("/",validarJWT, getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos

  ],
  crearHospital
);
router.put('/:id',[
    
], actualizarHospital);
router.delete('/:id', borrarHospital);

module.exports = router;
