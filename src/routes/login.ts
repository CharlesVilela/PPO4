import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//IMPORT MODEL
import Usuario from '../model/Usuario';

import statusCode from '../config/statusCode';

const router = Router();

const logado = {};

router.post('/logar', async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario)
        return res.status(statusCode.bad).send('not faund');

   // const a = await bcrypt.compare(senha, usuario.senha);
   // console.log(a, usuario.senha);

    if (senha != usuario.senha)
        return res.status(statusCode.bad).send('Senha inválida');

    const basetoken = 'd41d8cd98f00b204e9800998ecf8427e';

    const token = jwt.sign( { id: usuario.id }, basetoken, {
        expiresIn: 86400,
        algorithm: "HS256"
    } );

    return res.send({ usuario, token });


});



/*
router.route('/logar1')
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
*/


export default router;