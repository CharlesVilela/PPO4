import { Router, Request, Response } from 'express';
import mqtt, { Client } from 'mqtt';
import Broker from '../model/Broker';

const router = Router();

router.route('/connect/:id')
    .get(async (req: Request, res: Response) => {

        const HOST = 'stark';

        const { id } = req.params;
        const buscar = await Broker.findById(id);

        res.render('../views/broker/publish.hbs', { buscar })

        if (buscar != null) {

            const client = mqtt.connect('mqtt://broker.hivemq.com', {
                port: buscar.porta,
                host: HOST,
                connectTimeout: (30 * 100) / 1000,
                clean: buscar.clean,
                keepalive: 4,
            

                will: {
                    topic: 'dead',
                    payload: buscar.payload,
                    qos: buscar.qos,
                    retain: buscar.retain,
                    properties: {
                        willDelayInterval: (10 * 100) / 1000
                    }
                    
                }

            });
        }   

    })


export default router;