import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { hash } from 'bcryptjs';
import { StatusCode } from '../../constants/status';
import { UserNameAlreadyOccupiedException } from '../../exceptions/username-occupied';
import { getJWTPayload } from '../../utility/jwt';

const Router = Express.Router();

Router.post('/api/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, firstName, lastName, phone, email, image, password } = req?.body;

        const existingUser = await User.findOne({ userName });
        if(existingUser)
            throw new UserNameAlreadyOccupiedException();

        const encodedPassword = await hash(password, 12);

        let name: string = '';
        if(firstName && firstName?.trim()?.length > 0)
            name += firstName;
        if(lastName && lastName?.trim()?.length > 0) {
            if(name?.trim()?.length > 0)
                name += ' ' + lastName;
            else
                name += lastName;
        }

        const user = User.build({ userName, name, password: encodedPassword, phone, email, image });
        await user.save();

        const { token, expiryDate } = getJWTPayload(user);

        res?.status(StatusCode.SUCCESS).send({
            message: 'Signup success',
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

export { Router as SignupRoute };