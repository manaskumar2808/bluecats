import { Request, Response, NextFunction } from 'express';
import decode from 'jwt-decode';

declare global {
    namespace Express {
        interface Request {
            uid?: string;
        }
    }
}

interface Token {
    id: string;
};

const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req?.headers?.['authorization'];
    const token = authorization?.split?.(' ')?.[1];
    if(token) {
        const decodedToken = decode(token) as Token;
        req.uid = decodedToken?.id;
    }
    next();
}

export default authMiddlware;