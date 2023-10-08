import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { hash } from 'bcryptjs';
import { StatusCode } from '../../constants/status';
import { UserNameAlreadyOccupiedException } from '../../exceptions/username-occupied';
import { getJWTPayload } from '../../utility/jwt';
import { SignupValidator } from '../../validators/auth';
import { validateRequest } from '../../middlewares/validate-request';

const Router = Express.Router();

Router.post('/api/auth/signup', SignupValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, firstName, lastName, phone, email, image, rand, password } = req?.body;

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

        const user = User.build({ userName, name, password: encodedPassword, phone, email, image, rand });
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