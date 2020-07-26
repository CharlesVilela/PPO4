import { Schema, model, Document } from 'mongoose';

interface topicoInterface extends Document {
    nome: string;
    mensagem: string;
    usuario: string;
    broker: string
}

const topicoSchema = new Schema ({
    nome:{
        type: String,
        required: true
    },
    mensagem:[{
        type: String
    }],
    usuario: {
        type: String,
        required: true
    }
});

export default model<topicoInterface>('Topico', topicoSchema);