import Express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { StatusCode } from '../../constants/status';
import { UserNameAlreadyOccupiedException } from '../../exceptions/username-occupied';
import { UserNotFoundException } from '../../exceptions/user-not-found';

const Router = Express.Router();

Router.put('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id as string;

        const user = await User.findById(id);

        if(!user)
            throw new UserNotFoundException();

        const { userName, firstName, lastName, phone, email, image } = req?.body;

        const existingUser = await User.findOne({ userName });

        if(existingUser?.id !== user?.id)
            throw new UserNameAlreadyOccupiedException();

        let name: string = '';
        if(firstName && firstName?.trim()?.length > 0)
            name += firstName;
        if(lastName && lastName?.trim()?.length > 0) {
            if(name?.trim()?.length > 0)
                name += ' ' + lastName;
            else
                name += lastName;
        }

        user.set({
            userName,
            name,
            phone,
            email,
            image,
        });

        await user.save();

        res?.status(StatusCode.SUCCESS).send({
            message: 'User update success',
            payload: {
                user
            },
        });
    } catch(err) {
        next(err);
    }
});

export { Router as UserUpdateRoute };