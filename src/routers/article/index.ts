import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article, ArticleDoc } from "../../models/article";
import { getModifiedImageURL } from "../../utility/image";

const Route = Express.Router();

Route.get('/api/article/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await Article.find().populate('author');

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