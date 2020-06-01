import { Schema, model } from 'mongoose';


 const usuarioSchema = new Schema({ 

    nomeUsuario: {
        type: String,
        required: [true, 'O Nome do usuário é obrigatório'],
        lowercase: true,
       
    },
    email: {
        type: String,
        required: [true, 'O E-mail é obrigatório'],
        lowercase: true,
        unique: true,
       
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        lowercase: true,
        minlength: [8, 'A senha não pode ter menos que 8 caracteres'],
        maxlength: [16, 'A senha não pode ter mais que 16 caracteres'],
       
    }

    });

export default model('Usuario', usuarioSchema);

