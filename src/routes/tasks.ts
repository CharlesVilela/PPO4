import {Router, Request, Response} from 'express';

const router = Router();

// IMPORTS DE MODEL
import Tasks from '../model/Tasks';

router.route('/create')
        .get((req: Request, res: Response) => {
            res.render('tasks/create')
    })

    .post( async (req: Request, res: Response) => {
        const {title, description} = req.body;
        const newTasks = new Tasks({title, description});
        await newTasks.save();
        res.send('Saved');
    })

export default router;