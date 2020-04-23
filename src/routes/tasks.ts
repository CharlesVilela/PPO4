import { Router, Request, Response } from 'express';
import { enableProdMode } from '@angular copy/core';
import { platformBrowserDynamic } from '@angular copy/platform-browser-dynamic';




const router = Router();

// IMPORTS DE MODEL
import Tasks from '../model/Tasks';
//import { Error } from 'mongoose';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('tasks/create')
    })

    .post(async (req: Request, res: Response) => {
        const { title, description } = req.body;

        if (title != null && description != null ) {
        enableProdMode();
            const newTasks = new Tasks({ title, description });
            await newTasks.save();
            res.send('Saved');
        }
        else{
            //platformBrowserDynamic().bootstrapModule(AppModule).catch(console.error('error'));
        }
    })

export default router;