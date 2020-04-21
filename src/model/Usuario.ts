import { Schema, model } from 'mongoose';


const usuarioSchema = new Schema({

    nomeUsuario: {
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    senha:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 8,
        maxlength: 16
    },

    });

export default model('Usuario', usuarioSchema);

