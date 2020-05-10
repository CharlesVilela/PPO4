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

        var erros = []

        if (!req.body.nomeUsuario || req.body.nomeUsuario == undefined || req.body.nomeUsuario == null) {
            erros.push({ texto: 'Nome Invalido' });
        }
        if (!req.body.email || req.body.email == undefined || req.body.email == null) {
            erros.push({ texto: 'E-mail Invalido' });
        }
        if (req.body.senha.length < 8 || req.body.senha.length > 16 || req.body.senha == null) {
            erros.push({ texto: 'Senha Invalida ' });
        }
        if (req.body.senha != req.body.confirmarSenha) {
            erros.push({ texto: 'As senhas não são iguais' });
        }


        if (erros.length > 0) {
            res.render('usuario/create', { erros: erros });
        } else {

            const { nomeUsuario, email, senha, confirmarSenha } = req.body;
            const newUsuario = new usuario({ nomeUsuario, email, senha });
            await newUsuario.save();
            res.redirect('../usuario/list');
        }
    })


router.route('/list')
    .get(async (req: Request, res: Response) => {

        Usuario.find().then((listar) => {
            console.log(listar);
            res.render('usuario/list', { listar: listar });
        });
    });

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
       const { id } = req.params;
       await Usuario.findByIdAndDelete(id);
       res.redirect('../list');
    });


export default router;