import { Router, Request, Response } from 'express';

import Broker from '../model/Broker';
import Usuario from '../model/Usuario';

import conectBroker from '../routes/conectBroker';
import statusCode from '../config/statusCode';

const router = Router();

router.post('/create/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { numeroIp, porta, clear, payload, qos, retain } = req.body;
        const newBroker = new Broker({ numeroIp: numeroIp, porta: porta, clear: clear, payload: payload, qos: qos, retain: retain, usuario: id });
        await Broker.create(newBroker);

        return res.status(statusCode.created).json({ newBroker });
    } catch (error) {
        return res.status(statusCode.error).send('Error created Broker');
    }
});

router.get('/list', async (req: Request, res: Response) => {
    try {
        const brokers = await Broker.find();
        return res.status(statusCode.success).json({ brokers });
    } catch (error) {
        return res.status(statusCode.error).send('Error listen Brokers');
    }
});

router.get('/listarId/:id', async (req: Request, res: Response) => {
    try {
        const { id }  = req.params;
        const broker = await Broker.findById(id);
        return res.status(statusCode.success).json( broker);
    } catch (error) {
        return res.status(statusCode.error).send('Error listen Brokers');
    }
});

router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {numeroIp, porta, clear, payload, qos, retain} = req.body;
        const broker = await Broker.findByIdAndUpdate(id, { numeroIp: numeroIp, porta: porta, clear: clear, payload: payload, qos: qos, retain: retain });

        return res.status(statusCode.success).send('Update success');
    } catch (error) {
        return res.status(statusCode.error).send('Error Update Broker');
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await Broker.findByIdAndDelete(id);
        return res.status(statusCode.success).send('Deleting Broker success!');
    }catch(error){
        return res.status(statusCode.error).send('Error Deleting!');
    }
});

export default router;