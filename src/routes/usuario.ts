import express, { Response, Request, NextFunction } from 'express';

import statusCode from '../config/statusCode';

//Model
import Usuario from '../model/Usuario';


const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try {
        const { nomeUsuario, email, senha } = req.body;
        const newUsuario = new Usuario({ nomeUsuario, email, senha });

        console.log(newUsuario);

        await Usuario.create(newUsuario);
        return res.status(statusCode.created).send({ newUsuario });
    } catch (error) {
        return res.status(statusCode.error).send('error created!');
    }
});

router.get('/list', async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find();
        return res.status(statusCode.success).json({ usuarios });
    } catch (error) {
        return res.status(statusCode.error).send('Error listen!');
    }
});

router.get('/buscarId/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        return res.status(statusCode.success).json(usuario);
    } catch (error) {
        return res.status(statusCode.error).send('Error listen!');
    }
});

router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nomeUsuario, email, senha } = req.body;

        console.log(nomeUsuario, email, senha);

        await Usuario.findByIdAndUpdate(id, { nomeUsuario: nomeUsuario, email: email, senha: senha });
        return res.status(statusCode.success).send('Update');
    } catch (error) {
        return res.status(statusCode.error).send('Error in Update');
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndDelete(id);
        return res.status(statusCode.success).send('deleteding');
    } catch (error) {
        return res.status(statusCode.error).send('Error in deleting');
    }
});

export default router;