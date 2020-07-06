import { Schema, model, Document } from 'mongoose';
import mongoose from '../database';
import Usuario from '../model/Usuario';

interface brokerInterface extends Document {
    numeroIp: string
    porta: number
    clean: boolean
    payload: string
    qos: Number
    usuario: string

}

const brokerSchema = new Schema({
    numeroIp:{
        type: String,
        required: true,
        lowercase: true
    },
    porta:{
        type: Number,
        required: true,
        lowercase: true
    },
    clear:{
        type: Boolean,
        required: true,
        lowercase: true,
        default: false
    },
    payload:{
        type: String,
        required: true,
        lowercase: true
    },
    qos:{
       type: Number,
       required: true,
       lowercase: true,
       default: 0 
    },
    usuario:{
        type: String,
        required: true 
    }

})

export default model<brokerInterface>('Broker', brokerSchema);