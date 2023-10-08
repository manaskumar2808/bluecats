import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            console.log(errors);
            const error = (errors?.array()?.[0] as ValidationError)?.msg;
            throw new Error(`Request validation failed, ${error}`);
        }

        next();
    } catch(err) {
        next(err);
    }
}

export { validateRequest };