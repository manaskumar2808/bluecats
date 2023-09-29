import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";

const Route = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCode.PAGE_NOT_FOUND).send({
        error: 'Page not found!',
        payload: {},
    });
};

export { Route as PageNotFound };