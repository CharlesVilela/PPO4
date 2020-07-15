import { Router, Request, Response } from "express";

import conexao from './conectBroker';

const router = Router();


router.route('/publish')
    .get(async (req: Request, res: Response) => {
        //conexao
    })
