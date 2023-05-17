const jwt = require('jsonwebtoken');
const validarJWT = (req,res,next)=>{
    //Leer el token
    const token = req.header('x-token');
    if(!token) return res.status(401).send({msg: "No hay token en la petición"});
    try{
        const {id} =  jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();

    }catch(error){
        return res.status(401).send({msg: "Token no válido"});
    }
}
module.exports = {
    validarJWT
}