import { Router, Request, Response } from 'express';
import mqtt, { Client } from 'mqtt';
import Broker from '../model/Broker';
import { callbackPromise } from 'nodemailer/lib/shared';

const router = Router();



router.route('/connect')
    .get(async (req: Request, res: Response) => {

        const PORT = 1883;
        const HOST = 'stark';

        const broker = mqtt.connect('mqtt://broker.mqttdashboard.com', {
            port: PORT,
            host: HOST,
            connectTimeout: 30 * 100,
            clean: true,
            keepalive: 4,

            will: {
                topic: 'dead',
                payload: 'myPayload',
                qos: 1,
                retain: true
            }

        });

        const mensagem = 'Olá';
        const topico = 'localhost:3000/broker'

        //mqtt.Client#publish(topic, message, [options], [callback])

      //  broker.subscribe(mensagem);
      //  broker.publish(mensagem, topico);
        
        broker.on('connect', function () {
            try {
                broker.subscribe('presence', function  (err) {
                    if(!err){
                        broker.publish('presence', 'Publicando no Broker');
                        res.send('Broker Connected');
                    }
                    else{
                        res.send('Broker not connected')
                    }
                })
               
            } catch (error) {
                res.send('Error Connected Broker');
            }

        });

        broker.on('message', function(topico, mensagem ) {
            console.log(mensagem.toString())
            broker.end()
        })


    })



/*
const PORT = 1883;
const HOST = 'stark';

const broker = mqtt.connect('mqtt://broker.mqttdashboard.com', {
    port: PORT,
    host: HOST,
    connectTimeout: 30 * 100,
    clean: true,

    will: {
        topic: 'dead',
        payload: 'myPayload',
        qos: 1,
        retain: true
    }

});

const mensagem = 'Olá';

//mqtt.Client#publish(topic, message, [options], [callback])

broker.subscribe('messages');
broker.publish('messages', 'Current time is: ' + new Date);
broker.on('message', function () {

    try {
        console.log('Broker Connected');
    } catch (error) {
        console.log('Error Connected Broker');
    }

});

*/


export default router;