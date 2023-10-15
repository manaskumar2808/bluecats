import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import { uploadFile } from '../../../s3';
import { getModifiedImageURL } from '../../utility/image';
import { ArticleValidator } from '../../validators/article';
import { validateRequest } from '../../middlewares/validate-request';
import { ArticleMode } from '../../constants/article';
import authMiddlware from '../../middlewares/auth-middleware';
import requireAuth from '../../middlewares/require-auth';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';

const Route = express.Router();

const unlink = util.promisify(fs.unlink);

Route.post('/api/article/', authMiddlware, requireAuth, ArticleValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, image, id } = req?.body || {};

        if(id) {
            const article = await Article.findById(id)?.populate('author');
            article?.set({
                mode: ArticleMode.PUBLISHED,
            });
            await article?.save();

            return res.status(StatusCode.SUCCESS).send({
                message: 'Article posted successfully',
                payload: {
                    article
                }
            });
        }

        const file = req?.file as Express.Multer.File;

        let imageUrl: string | undefined;
        if (file) {
            imageUrl = file.path as string;
            const result: any = await uploadFile(file);
            imageUrl = 'uploads/' + result.Key;
            await unlink(file.path);
        }

        const url = imageUrl || image;

        let article = Article.build({ title, content, image: url, author: req?.uid as string, mode: ArticleMode.PUBLISHED });
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

Route.post('/api/draft/', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, image, id } = req?.body || {};

        let article;
        
        if(id)
            article = await Article.findById(id);

        const file = req?.file as Express.Multer.File;

        let imageUrl: string | undefined;
        if ((!article || !article?.image) && file) {
            imageUrl = file.path as string;
            const result: any = await uploadFile(file);
            imageUrl = 'uploads/' + result.Key;
            await unlink(file.path);
        }

        const url = imageUrl || image;

        const obj = { title, content, image: url, author: req?.uid as string, mode: ArticleMode.DRAFT };

        if(article)
            article.set(obj);
        else
            article = Article.build(obj);
        
        await article?.save();

        article.image = getModifiedImageURL(article?.image);

        res.status(StatusCode.SUCCESS).send({
            message: 'Draft saved successfully',
            payload: {
                draft: article
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as PostArticleRoute };