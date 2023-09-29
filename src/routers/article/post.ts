import fs from 'fs';
import util from 'util';
import express, { Express, Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import { Multer } from 'multer';
import { uploadFile } from '../../../s3';
import { getModifiedImageURL } from '../../utility/image';

const Route = express.Router();

const unlink = util.promisify(fs.unlink);

Route.post('/api/article/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, image, author } = req?.body || {};

        const file = req?.file as Express.Multer.File;

        let imageUrl: string | undefined;
        if (file) {
            imageUrl = file.path as string;
            const result: any = await uploadFile(file);
            imageUrl = 'uploads/' + result.Key;
            await unlink(file.path);
        }

        const url = imageUrl || image;

        let article = Article.build({ title, content, image: url, author });
        await article?.save();

        article.image = getModifiedImageURL(article?.image);

        res.status(StatusCode.SUCCESS).send({
            message: 'Article posted successfully',
            payload: {
                article
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as PostArticleRoute };