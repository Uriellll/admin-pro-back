const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async (req,res)=>{
    const desde = Number(req.query.desde) || 0;
    /* console.log(req.id); Aquí obtenemos el id que viene del Middleware validar-jws, podemos tener la data del middleare en en controlador*/ 
    /* const usuarios = await Usuario.find()
        .skip(desde)
        .limit(5);
    const total = await Usuario.count() */
    const [usuarios,total]  =await Promise.all([
        Usuario.find()
        .skip(desde)
        .limit(5),
        Usuario.count()
    ])
    return res.status(200).send({ok:true,usuarios, total});

}
const crearUsuario = async (req,res)=>{
    const {email,password,nombre} = req.body;
    try{
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail) return res.status(400).send({msg: "El correo ya está registrado"})
        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save();
        const token = await generarJWT(usuario.id);
        return res.status(200).send({usuario, token});  
    }catch(error){
        return res.status(500).json({msg: 'Error indesperado'});
    }  
}
const actualizarUsuario = async(req, res)=>{
    const id = req.params.id;
    try{
        const usuarioDb = await Usuario.findById(id);
        if(!usuarioDb){
            return res.status(404).send({msg: "El usuario no existe"})
        }
        //Quito el password y google para uqe no se actualicen delete password
        const {password, google,email,...campos} = req.body;
        if(usuarioDb.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) return res.status(400).send({msg: 'Hay un usuario con ese correo'});
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});
        return res.status(200).send({usuario: usuarioActualizado})
    }catch(error){
        return res.status(500).json({msg: 'Error indesperado' + error});
    }
}
const borrarUsuario = async(req,res)=>{
    const id = req.params.id;
    try{
        const usuarioDb = await Usuario.findById(id);
        if(!usuarioDb){
            return res.status(404).send({msg: "El usuario no existe"})
        }
        await Usuario.findByIdAndDelete(id);
        return res.status(200).send({msg:'Usuario eliminado'})
    }catch(error){
        return res.status(500).json({msg: 'Error indesperado' + error});
    }

}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}