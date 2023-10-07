import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { UserNotFoundException } from '../../exceptions/user-not-found';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InvalidPasswordException } from '../../exceptions/invalid-password';
import { StatusCode } from '../../constants/status';
import { getJWTPayload } from '../../utility/jwt';

const Router = Express.Router();

Router.post('/api/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, password } = req?.body;

        const user = await User.findOne({ userName });
        if(!user)
            throw new UserNotFoundException();

        const encodedPassword = user?.password;
        const valid = await compare(password, encodedPassword);
        if(!valid)
            throw new InvalidPasswordException();

        const { token, expiryDate } = getJWTPayload(user);

        res?.status(StatusCode.SUCCESS).send({
            message: 'Login success',
            payload: {
                user,
                token,
                expiryDate,
            },
        });
    } catch(err) {
        next(err);
    }
});

export { Router as LoginRoute };