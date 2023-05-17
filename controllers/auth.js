const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const login = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const usuarioDb = await Usuario.findOne({email});
        if(!usuarioDb){
            return res.status(404).send({msg: "Credenciales inválidas"})
        }
        const validPassword = bcrypt.compareSync(password,usuarioDb.password);
        if(!validPassword) return res.status(404).send({msg: "Credenciales inválidas"});
        //Generar token
        const token = await generarJWT(usuarioDb.id);

        return res.status(200).send({msg: "Login correcto",token})
    }catch(error){
        return res.status(500).send({msg: "Hable con el administrador"});
    }
};
module.exports = {
    login
}