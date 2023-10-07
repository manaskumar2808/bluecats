import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import { getModifiedImageURL } from "../../utility/image";

const Route = Express.Router();

Route.get('/api/article/:title', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req?.params;
        const encodedTitle = params?.title as string;
        const title = decodeURIComponent(encodedTitle);

        let article = await Article.findOne({ title }).populate('author');

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

export { Route as GetArticleRoute };