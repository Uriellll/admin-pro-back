const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('Db online')
    }catch(error){
        throw new Error('Error al conectar');
    }
    
}
module.exports = {
    dbConnection
}