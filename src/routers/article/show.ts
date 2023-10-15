import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import { getModifiedImageURL } from "../../utility/image";
import authMiddlware from "../../middlewares/auth-middleware";
import requireAuth from "../../middlewares/require-auth";
import { ArticleNotFoundException } from "../../exceptions/article-not-found";

const Route = Express.Router();

Route.get('/api/article/:title', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req?.params;
        const encodedTitle = params?.title as string;
        const title = decodeURIComponent(encodedTitle);

        let article = await Article.findOne({ title }).populate('author');

        if(!article)
            throw new ArticleNotFoundException();

        if(article)
            article.image = getModifiedImageURL(article?.image);

        res.status(StatusCode.SUCCESS).send({
            message: 'Article fetched successfully',
            payload: {
                article
            }
        });
    } catch(err) {
        next(err);
    }
});

Route.get('/api/draft/:id', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;

        let article = await Article.findById(id).populate('author');

        if(!article)
            throw new ArticleNotFoundException();

        if(article)
            article.image = getModifiedImageURL(article?.image);

        res.status(StatusCode.SUCCESS).send({
            message: 'Draft fetched successfully',
            payload: {
                draft: article
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as GetArticleRoute };