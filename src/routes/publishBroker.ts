import { Router, Request, Response } from 'express';
import mqtt, { Client } from 'mqtt';
import Broker from '../model/Broker';

import conectarBroker from '../routes/conectBroker';
import Topico from '../model/Topico';

const router = Router();

router.route('/publish/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const broker = await Broker.findById(id);

        if (broker != null) { console.log(broker.porta) }

        // res.render('broker/publish', { broker })
    })
    .post(async (req: Request, res: Response) => {

        //const HOST = 'stark';

        const { id } = req.params;
        const { topico, mensagem } = req.body; 
        
        const broker = await Broker.findById(id);

            const client = mqtt.connect('mqtt://broker.hivemq.com');

            //await Broker.findOneAndUpdate({"topico.nome":"Cozinha"},   {$push: {"topico.mensagem": "Teste", "topico.nome": "Cozinha" } });

            client.on('connect', function () {
                try {
                    client.subscribe(topico, async function (err) {
                        if (!err) {
                            
                            client.connected;
                            client.publish(topico, mensagem);

                            await Topico.findOneAndUpdate({nome: topico}, { $push: { mensagem: mensagem } }, {upsert: false});
                            //console.log(ca);

                        } 
                        else {
                            res.send('Broker not connected')
                        }
                    })

                } catch (error) {
                    res.send('Error Connected Broker');
                }

            });

            client.on('message', function (topico, mensagem) {
                console.log(mensagem.toString());
                res.send(mensagem.toString());
                client.end();
            });

    });


export default router;