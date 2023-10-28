import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { validateRequest } from '../../middlewares/validate-request';
import authMiddlware from '../../middlewares/auth-middleware';
import requireAuth from '../../middlewares/require-auth';
import { Segment } from '../../models/segment';
import { SegmentNotFoundException } from '../../exceptions/segment-not-found';

const Route = express.Router();

Route.delete('/api/segment/:id', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;

        const segment = await Segment.findByIdAndDelete(id);

        if(!segment)
            throw new SegmentNotFoundException();

        res.status(StatusCode.DELETED).send({
            message: 'Segment deleted successfully',
            payload: {
                segment,
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as DeleteSegmentRoute };