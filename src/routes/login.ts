import { Router, Request, Response } from 'express';
import crypto from 'crypto';

//IMPORT MODEL
import Usuario from '../model/Usuario';

const router = Router();

const logado = {};

router.route('/logar')
    .get((req: Request, res: Response) => {
        res.render('login/login')
    })
    .post(async (req: Request, res: Response) => {


        try {
            const verificarEmail = req.body.email;
            const verificarSenha = req.body.senha;
            const logof = await Usuario.findOne({ email: verificarEmail, senha: verificarSenha }, function (err, arr) { });
            if (logof != null) {
                 res.render('../views/paginas/principal.hbs', { logof });
            }
            else {
                return res.status(404).send({error: 'E-mail não encontrado'});
            }
        } catch (error) {
            return res.status(400).send({error: 'Error Login'});
        }

    });



export default router;