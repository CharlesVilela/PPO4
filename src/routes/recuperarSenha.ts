import { Router, Request, Response } from 'express';
import crypto from 'crypto';

//IMPORT MODEL
import Usuario from '../model/Usuario';

//RECUPERARSENHA
import recuperarSenha from './mailerConfig';

const router = Router();


router.route('/esqueci_senha')
    .get((req: Request, res: Response) => {
        res.render('login/esqueciSenha')
    })
    .post(async (req: Request, res: Response) => {
        const { email } = req.body;

        try {
            const usuario = await Usuario.findOne({ email });

            if (!usuario)
                res.status(400).send({ error: 'Usuario não encontrado' })

            const senhaTemporaria = crypto.randomBytes(5).toString('hex');

            await Usuario.findByIdAndUpdate(usuario?._id, {
                '$set': {
                    senha: senhaTemporaria,
                }
            });

            recuperarSenha.sendMail({
                to: email,
                from: "charlesvilela12@gmail.com",
                subject: "Você esqueceu a sua senha não se preocupe",
                text: "",
                html: senhaTemporaria

            }, (error) => {
                if (error) return res.status(400).send({ error: 'Error ao enviar o E-mail' });

                return res.redirect('../recuperarSenha/logar');

            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Erro em esqueci a minha senha' })
        }

    });

router.route('/logar')
    .get((req: Request, res: Response) => {
        res.render('login/loginRecuperarSenha')
    })
    .post(async (req: Request, res: Response) => {
        const verificarEmail = req.body.email;
        const verificarSenha = req.body.senha;

        const logof = await Usuario.findOne({ email: verificarEmail, senha: verificarSenha }, function (err, arr) { });

        if (logof != null) {
            res.render('../views/login/atualizarSenha.hbs', { logof });
        }
        else {
            res.send('Não encontrado');
        }
    });

//atualizarSenha

router.route('/atualizarSenha/:id')
    .get(async (req: Request, res: Response) => {
        res.render('login/atualizarSenha')
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

    })
    .post(async (req: Request, res: Response) => {

            const { id } = req.params;
            const { senha, confirmarNovaSenha } = req.body;

            if(senha != confirmarNovaSenha){
                res.send('Senhas não se batem')
            }
            else{
                const logof = await Usuario.findByIdAndUpdate(id, { senha });
                res.render('../views/paginas/principal.hbs', { logof });
            }
    });

export default router;