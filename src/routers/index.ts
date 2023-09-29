import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../constants/status";

const Route = Express.Router();

Route.get('/api/home/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCode.SUCCESS).send({
            message: 'Home page',
            payload: {}
        });
    } catch(err) {
        next(err);
    }
});

export { Route as HomeRoute };