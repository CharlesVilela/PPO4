import { Router, Request, Response } from 'express';

// IMPORTS DE MODEL
import usuario from '../model/Usuario';
import Usuario from '../model/Usuario';


const router = Router();



router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('usuario/create')
    })

    .post(async (req: Request, res: Response) => {

        const { nomeUsuario, email, senha, confirmarSenha } = req.body;

        if (senha == confirmarSenha) {

            const newUsuario = new usuario({ nomeUsuario, email, senha });
            await newUsuario.save();
            res.send('Saved');
            (error: any) => alert('erro');
        }
        else {
            res.send('Senhas não se correspondem!');
        }
    })


    router.route('/list')
    .get(async (req: Request, res: Response) => {
        const listar = await Usuario.find();
        console.log(listar);
        res.render('usuario/list', {listar});
    })

export default router;