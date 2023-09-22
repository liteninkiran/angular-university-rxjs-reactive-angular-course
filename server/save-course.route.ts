import { Request, Response } from 'express';
import { COURSES } from './db-data';
import { setTimeout } from 'timers';

export function saveCourse(req: Request, res: Response) {

    const throwError = false;

    if (throwError) {
        console.log('ERROR saving course!');
        setTimeout(() => {
            res.sendStatus(500);
        }, 2000);
        return;
    }

    const id = req.params['id'];
    const changes = req.body;

    console.log('Saving course changes', id, JSON.stringify(changes));

    const newCourse = {
        ...COURSES[id],
        ...changes
    }

    COURSES[id] = newCourse;

    console.log('New course version', newCourse);

    setTimeout(() => {
        res.status(200).json(COURSES[id]);
    }, 2000);
}
