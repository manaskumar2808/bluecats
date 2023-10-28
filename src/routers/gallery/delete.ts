import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { getModifiedImageURL } from '../../utility/image';
import { validateRequest } from '../../middlewares/validate-request';
import authMiddlware from '../../middlewares/auth-middleware';
import requireAuth from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryValidator } from '../../validators/gallery';
import { GalleryNotFoundException } from '../../exceptions/gallery-not-found';

const Route = express.Router();

Route.delete('/api/gallery/:id', authMiddlware, requireAuth, GalleryValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const gallery = await Gallery.findByIdAndDelete(id);

        if(!gallery)
            throw new GalleryNotFoundException();

        gallery.url = getModifiedImageURL(gallery?.url) as string;

        res.status(StatusCode.DELETED).send({
            message: 'Gallery deleted successfully',
            payload: {
                gallery,
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as DeleteGalleryRoute };