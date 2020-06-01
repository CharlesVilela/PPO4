import { Router, Request, Response } from 'express';
import crypto from 'crypto';

//IMPORT MODEL
import Usuario from '../model/Usuario';

const router = Router();

router.route('/logar')
    .get((req: Request, res: Response) => {
        res.render('login/login')
    })
    .post(async (req: Request, res: Response) => {
        const verificarEmail = req.body.email;
        const verificarSenha = req.body.senha;

        const logof = await Usuario.findOne({ email: verificarEmail, senha: verificarSenha }, function (err, arr) { });

        if (logof != null) {
            res.render('../views/paginas/principal.hbs', {logof});
        }
        else {
            res.send('Não encontrado');
        }
    });



export default router;