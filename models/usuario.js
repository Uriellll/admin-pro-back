const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required:true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false   
    }
});
UsuarioSchema.method('toJSON', function(){
    const {__v,password, ...Object} = this.toObject();
    return Object;
})
module.exports = model('Usuario', UsuarioSchema);