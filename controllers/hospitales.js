const {response} = require('express');
const Hospital = require('../models/hospital');
const getHospitales = async (req,res = response)=>{
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img')
    res.json({
        ok:true,
        hospitales
    })
}
const crearHospital = async (req,res = response)=>{
    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
    try{
        const hospitalDB =await hospital.save();
        res.status(200).send({ok:true, hospital:hospitalDB})
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}
const actualizarHospital = (req,res=response)=>{
    res.status(200).send({msg: "actualizar Hospitales"})
}
const borrarHospital = (req,res= response)=>{
    res.status(200).send({msg: "borrar hospital"})

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
