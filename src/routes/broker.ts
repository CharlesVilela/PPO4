import { Router, Request, Response } from 'express';

import Broker from '../model/Broker';
import Usuario from '../model/Usuario';

import conectBroker from '../routes/conectBroker';

const router = Router();

router.route('/create/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        res.render('broker/create', { usuario })
    })
    .post(async (req: Request, res: Response) => {
        try {
            const { numeroIp, porta, clear, payload, qos, retain, usuario } = req.body;
            const newBroker = new Broker({ numeroIp, porta, clear, payload, qos, retain, usuario });
            await newBroker.save();
            return res.status(200).send('Creating Sucess!');
        } catch (error) {
            return res.status(400).send({ error: 'Error creating new Broker' });
        }

    });

router.route('/list/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const busca = await Usuario.findById(id);
        if (busca != null) {
            Broker.find({ usuario: busca.nomeUsuario }).then((listar) => {
                console.log(listar);
                res.render('../views/broker/list.hbs', { listar: listar });
            });
        }
    });

router.route('/update/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const broker = await Broker.findById(id);

        if (broker != null) {
            res.render('broker/update', { broker })
        }
    })
    .post(async (req: Request, res: Response) => {

        const { id } = req.params;
        const { numeroIp, porta } = req.body;
        await Broker.findByIdAndUpdate(id, { numeroIp, porta });
        res.redirect('../views/topico/list.hbs');
    });

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Broker.findByIdAndDelete(id);
        res.redirect('../list');
    });


export default router;