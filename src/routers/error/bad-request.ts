import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";

const Route = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Bad Request Error:', err?.message);

    if(err instanceof SyntaxError) {
        return res.status(StatusCode.BAD_REQUEST).send({
            error: 'Bad request: invalid JSON!',
            payload: {},
        });
    }

    res.status(StatusCode.BAD_REQUEST).send({
        error: 'Bad request!',
        payload: {},
    });
};

export { Route as BadRequest };