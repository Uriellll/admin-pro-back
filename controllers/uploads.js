const {response} = require('express');
const fs = require('fs');
const path = require('path')
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const {v4:uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fileUpload = (req,res=response)=>{
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(404).send({
            ok:false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        })
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send({
            ok:false,
            msg:'No hay archivo'})
    }
    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif' ];
    console.log(extensionArchivo);
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(404).send({
            ok:false,
            msg: 'No es una extensión permitida'
        })
    }
    //Generar el nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //mover la imagen
    file.mv(path, function(err){
        if(err){
            return res.status(500).send({
                ok:false,
                msg: 'Ocurrió un error al guardar archivo'
            })
        }
        //Actualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);

        res.status(200).send({
            ok:true,
            msg:'Archivo subido correctamente',
            nombreArchivo
        })
    })
}
const retornaImagen = (req,res= response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports ={
    fileUpload,
    retornaImagen
}