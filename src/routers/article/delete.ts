import Express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { Article } from "../../models/article";
import authMiddlware from "../../middlewares/auth-middleware";
import requireAuth from "../../middlewares/require-auth";
import { ArticleNotFoundException } from "../../exceptions/article-not-found";

const Route = Express.Router();

Route.delete('/api/article/:id', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;

        let article = await Article.findByIdAndDelete(id);

        if(!article)
            throw new ArticleNotFoundException();

        res.status(StatusCode.DELETED).send({
            message: 'Article deleted successfully',
            payload: {},
        });
    } catch(err) {
        next(err);
    }
});

Route.delete('/api/draft/:id', authMiddlware, requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;

        let article = await Article.findByIdAndDelete(id);
        
        if(!article)
            throw new ArticleNotFoundException();

        res.status(StatusCode.DELETED).send({
            message: 'Draft deleted successfully',
            payload: {}
        });
    } catch(err) {
        next(err);
    }
});

export { Route as DeleteArticleRoute };