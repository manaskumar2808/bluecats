import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { StatusCode } from '../../constants/status';
import { UserNotFoundException } from '../../exceptions/user-not-found';

const Router = Express.Router();

Router.get('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id as string;

        const user = await User.findById(id);

        if(!user)
            throw new UserNotFoundException();

        res?.status(StatusCode.SUCCESS).send({
            message: 'User show success',
            payload: {
                user
            },
        });
    } catch(err) {
        next(err);
    }
});

export { Router as UserShowRoute };