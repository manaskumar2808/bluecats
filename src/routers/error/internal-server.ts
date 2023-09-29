import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";

const Route = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
        error: 'Internal server error!',
        payload: {},
    });
};

export { Route as InternalServer };