import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { StatusCode } from '../../constants/status';
import { UserNotFoundException } from '../../exceptions/user-not-found';
import { compare, hash } from 'bcryptjs';
import { InvalidPasswordException } from '../../exceptions/invalid-password';

const Router = Express.Router();

Router.put('/api/password-reset/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id as string;

        const user = await User.findById(id);

        if(!user)
            throw new UserNotFoundException();

        const { oldPassword, newPassword } = req?.body;

        const valid = await compare(oldPassword, user?.password);
        if(!valid)
            throw new InvalidPasswordException();

        const passwordHash = await hash(newPassword, 12);

        user.set({
            password: passwordHash,
        });

        await user.save();

        res?.status(StatusCode.SUCCESS).send({
            message: 'Password reset success',
            payload: {
                user
            },
        });
    } catch(err) {
        next(err);
    }
});

export { Router as UserPasswordRoute };