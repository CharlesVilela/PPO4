import { Router, Request, Response } from 'express';

import Broker from '../model/Broker';
import Usuario from '../model/Usuario';

import conectBroker from '../routes/conectBroker';

const router = Router();

router.route('/create/:id')
.get(async(req: Request, res: Response) => {
    
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    res.render('broker/create', { usuario })


})
.post(async(req: Request, res: Response) => {

    try {

        const { numeroIp, porta, clear, payload, qos, usuario } = req.body;
        const newBroker = new Broker({ numeroIp, porta, clear, payload, qos, usuario });
        await newBroker.save();

        return res.status(200).send('Creating Sucess!');
        

    } catch (error) {
        return res.status(400).send({error: 'Error creating new Broker'});
    }

});

router.route('/list')
    .get(async (req: Request, res: Response) => {

        Broker.find().then((listar) => {
            console.log(listar);
            res.render('../views/paginas/principal.hbs', { listar: listar });
        });
    });

    router.route('/update/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const broker = await Broker.findById(id);

        res.render('broker/update', { broker })
    })
    .post(async (req: Request, res: Response) => {

        const { id } = req.params;
        const { numeroIp, porta } = req.body;
        await Broker.findByIdAndUpdate(id, { numeroIp, porta });
        res.redirect('../list');
    });

    router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Broker.findByIdAndDelete(id);
        res.redirect('../list');
    });


    router.route('/conectBroker')
    .get(async (req: Request, res: Response) => {

        res.send(conectBroker);
        
    });


export default router;