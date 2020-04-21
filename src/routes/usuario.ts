import { Router, Request, Response } from 'express';

import { AlertComponent, AlertModule } from 'ngx-bootstrap/alert';


const router = Router();

// IMPORTS DE MODEL
import usuario from '../model/Usuario';

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

export default router;