const {response} = require('express');
const Medico = require('../models/medico');
const getMedicos = async(req,res = response)=>{
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    res.json({
        ok:true,
        medicos
    }) 
}
const crearMedico = async (req,res = response)=>{
    const uid = req.uid;
    const body = req.body;
    const medico = new Medico({
        ...body,
        usuario: uid
    })
    try{
        const medicoDB = await medico.save();
        res.status(200).send({ok:true,medico: medicoDB})
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    } 
}
const actualizarMedico = (req,res=response)=>{
    res.status(200).send({msg: "actualizar medicos"})
}
const borrarMedico = (req,res= response)=>{
    res.status(200).send({msg: "borrar medico"})

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
