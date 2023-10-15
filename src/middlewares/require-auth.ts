import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedException } from '../exceptions/unauthorized';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req?.uid)
            throw new UnAuthorizedException();
        next();
    } catch(err) {
        next(err);
    }
}

export default requireAuth;