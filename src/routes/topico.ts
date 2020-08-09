import { Router, Response, Request } from 'express';

import Topico from '../model/Topico';
import Broker from '../model/Broker';

import statusCode from '../config/statusCode';
import autoMidlewares from '../middlewares/auth';

const router = Router();

router.use(autoMidlewares);

router.post('/create/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const newTopico = new Topico({ nome: nome, usuario: id });
        await Topico.create(newTopico);

        await Broker.findOneAndUpdate({ usuario: id }, { $push: { topico: newTopico } });

        return res.status(statusCode.success).json({ newTopico });
    } catch (error) {
        return res.status(statusCode.error).send('Error created Topico');
    }
});

router.get('/list', async (req: Request, res: Response) => {
    try {
        const topicos = await Topico.find();
        return res.status(statusCode.success).json({ topicos });
    } catch (error) {
        return res.status(statusCode.error).send('Error listen Topico');
    }
});

router.get('/listarId/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findById(id);
        return res.status(statusCode.success).json(topico);
    } catch (error) {
        return res.status(statusCode.error).send('Error listen Brokers');
    }
});

router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const topico = await Topico.findByIdAndUpdate(id, { nome: nome });

        return res.status(statusCode.success).send('Update success!');
    } catch (error) {
        return res.status(statusCode.error).send('Error Update Broker');
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Topico.findByIdAndDelete(id);
        await Broker.findOneAndUpdate({topico: id}, {$pull: {topico: id} });
        return res.status(statusCode.success).send('Deleting Topico success!');
    } catch (error) {
        return res.status(statusCode.error).send('Error Deleting!');
    }
});

export default router;