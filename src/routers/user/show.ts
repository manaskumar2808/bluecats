import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { StatusCode } from '../../constants/status';
import { UserNotFoundException } from '../../exceptions/user-not-found';
import { InvalidUserNameException } from '../../exceptions/invalid-username';

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

// /api/user?username=[username]

Router.get('/api/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req?.query?.username as string;

        if(!userName)
            throw new InvalidUserNameException();

        const user = await User.findOne({ userName });

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