import express, { Request, Response } from 'express';
import { getFileStream } from '../../../s3';

const Router = express.Router();

Router.get('/uploads/:key', (req: Request, res: Response) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
});

export { Router as GalleryRoute };