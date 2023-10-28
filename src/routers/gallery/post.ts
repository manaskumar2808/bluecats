import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { uploadFile } from '../../../s3';
import { getModifiedImageURL } from '../../utility/image';
import { validateRequest } from '../../middlewares/validate-request';
import authMiddlware from '../../middlewares/auth-middleware';
import requireAuth from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../constants/gallery';
import { GalleryValidator } from '../../validators/gallery';

const Route = express.Router();

const unlink = util.promisify(fs.unlink);

Route.post('/api/gallery/', authMiddlware, requireAuth, GalleryValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url: mediaUrl, caption, type = GalleryType.IMAGE } = req?.body || {};

        const file = req?.file as Express.Multer.File;

        let cdnUrl: string | undefined;
        let cdn: boolean | undefined = false;
        if (file) {
            cdnUrl = file.path as string;
            const result: any = await uploadFile(file);
            cdnUrl = 'uploads/' + result.Key;
            cdn = true;
            await unlink(file.path);
        }

        const url = cdnUrl || mediaUrl;

        const gallery = Gallery.build({ url, type, caption, cdn });
        await gallery.save();

        gallery.url = getModifiedImageURL(gallery?.url) as string;

        res.status(StatusCode.SUCCESS).send({
            message: 'Gallery posted successfully',
            payload: {
                gallery,
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as PostGalleryRoute };