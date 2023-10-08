import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article, ArticleDoc } from "../../models/article";
import { getModifiedImageURL } from "../../utility/image";

const Route = Express.Router();

// /api/article?user=[userId]
Route.get('/api/article/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.query?.user as string;
        
        let articles = [];
        if(userId)
            articles = await Article.find({ author: userId }).populate('author');
        else
            articles = await Article.find().populate('author');

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

export { Route as GetArticlesRoute };