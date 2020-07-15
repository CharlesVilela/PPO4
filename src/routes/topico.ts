import { Router, Response, Request } from 'express';

import Topico from '../model/Topico';
import Usuario from '../model/Usuario';
import Broker from '../model/Broker';

const router = Router();

router.route('/create/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        res.render('topico/create', { usuario })


    })
    .post(async (req: Request, res: Response) => {

        try {

            const { nome, mensagem, usuario } = req.body;
            const newTopico = new Topico({ nome, mensagem, usuario });
            await newTopico.save();

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
            Topico.find({ usuario: busca.nomeUsuario }).then((listar) => {
                console.log(listar);
                res.render('../views/topico/list.hbs', { listar: listar });
            });
        }
    });

router.route('/update/:id')
    .get(async (req: Request, res: Response) => {

        const { id } = req.params;
        const topico = await Topico.findById(id);

        if (topico != null) { console.log(topico.nome) }

        res.render('topico/update', { topico })
    })
    .post(async (req: Request, res: Response) => {

        const { id } = req.params;
        const { nome, mensagem } = req.body;
        await Topico.findByIdAndUpdate(id, { nome, mensagem });
        res.redirect('../list');
    });

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Topico.findByIdAndDelete(id);
        res.redirect('../list');
    });


router.route('/subscribe/:id')
    .get(async (req: Request, res: Response) => {

       // const { id } = req.params;
        const broker = await Broker.find();

        res.render('topico/subscribe', { broker: broker })
    })
    .post(async (req: Request, res: Response) => {

        const { id } = req.params;
        const { broker } = req.body;
        await Topico.findByIdAndUpdate(id, { broker });
        res.redirect('../list');
    });


export default router;