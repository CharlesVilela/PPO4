import { Router, Request, Response } from 'express';
import mqtt, { Client } from 'mqtt';
import Broker from '../model/Broker';

const router = Router();

router.route('/connect/:id')
    .get(async (req: Request, res: Response) => {


        // res.render('../views/broker/publish.hbs')

        const HOST = 'stark';

        const { id } = req.params;
        const buscar = await Broker.findById(id);

        if (buscar != null) {

            const broker = mqtt.connect('mqtt://broker.mqttdashboard.com', {
                port: buscar.porta,
                host: HOST,
                connectTimeout: 30 * 100,
                clean: buscar.clean,
                keepalive: 4,

                will: {
                    topic: 'dead',
                    payload: buscar.payload,
                    qos: buscar.qos,
                    retain: buscar.retain,
                    properties: {
                        willDelayInterval: 10 * 100
                    }
                }

            });


            broker.on('connect', function () {
                try {

                    // const { mensagem } = req.body;
                   // const mensagem = 'Olá';

                    broker.subscribe('presence', function (err) {
                        if (!err) {
                            broker.publish('presence', 'Testando o Broker');
                            res.send('Broker connected')
                        }
                        else {
                            res.send('Broker not connected')
                        }
                    })

                } catch (error) {
                    res.send('Error Connected Broker');
                }

            });

            broker.on('message', function (topico, mensagem) {
                //res.render('../views/broker/publish.hbs', {mensagem: mensagem})
                console.log(mensagem.toString())
                broker.end()
            })

        }

    })


export default router;