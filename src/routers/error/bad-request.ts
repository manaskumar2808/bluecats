import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";

const Route = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof SyntaxError) {
        return res.status(StatusCode.BAD_REQUEST).send({
            error: err?.message || 'Bad request: invalid JSON!',
            payload: {},
        });
    }

    res.status(StatusCode.BAD_REQUEST).send({
        error: err?.message || 'Bad request!',
        payload: {},
    });
};

export { Route as BadRequest };