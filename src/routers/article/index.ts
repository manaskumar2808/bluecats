import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import { getModifiedImageURL } from "../../utility/image";
import { ArticleMode } from "../../constants/article";
import authMiddlware from "../../middlewares/auth-middleware";
import requireAuth from "../../middlewares/require-auth";

const Route = Express.Router();

// /api/article?user=[userId]
Route.get('/api/article/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.query?.user as string;
        
        let articles = [];
        if(userId)
            articles = await Article.find({ 
                author: userId, 
                $or: [
                    { mode: ArticleMode.PUBLISHED },
                    { mode: { $exists: false } },
                ]
            }).sort({ 'createdAt': -1 }).populate('author').populate('segments');
        else
            articles = await Article.find({
                $or: [
                    { mode: ArticleMode.PUBLISHED },
                    { mode: { $exists: false } },
                ],
            }).sort({ 'createdAt': -1 }).populate('author').populate('segments');

        for(let article of articles) {
            article.image = getModifiedImageURL(article?.image);
        }

        res.status(StatusCode.SUCCESS).send({
            message: 'Articles fetched successfully',
            payload: {
                articles,
            }
        });
    } catch(err) {
        next(err);
    }
});

Route.get('/api/draft/', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.uid;
        
        let articles = [];
        if(userId)
            articles = await Article.find({ author: userId, mode: ArticleMode.DRAFT }).sort({ 'createdAt': -1 }).populate('author').populate('segments');
        else
            articles = await Article.find({ mode: ArticleMode.DRAFT }).sort({ 'createdAt': -1 }).populate('author').populate('segments');

        for(let article of articles) {
            article.image = getModifiedImageURL(article?.image);
        }

        res.status(StatusCode.SUCCESS).send({
            message: 'Articles fetched successfully',
            payload: {
                drafts: articles,
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as GetArticlesRoute };