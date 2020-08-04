import { Schema, model, Document } from 'mongoose';
import mongoose from '../database';
import Usuario from '../model/Usuario';
import Topico from '../model/Topico';


import { QoS } from 'mqtt';

interface brokerInterface extends Document {
    numeroIp: string;
    porta: number;
    clean: boolean;
    payload: string;
    qos: QoS;
    retain: boolean;
    usuario: string;

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
       default: 1 
    },
    retain:{
        type: Boolean,
        required: true,
        default: false
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    topico:[{
        type: Schema.Types.ObjectId,
        ref: 'Topico'
    }]
}
)

export default model<brokerInterface>('Broker', brokerSchema);