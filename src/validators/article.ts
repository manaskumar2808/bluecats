import { body } from 'express-validator';
import { ArticleFactors } from '../constants/article';

export const ArticleValidator = [
    body('title')
        .isLength({ min: ArticleFactors.MIN_TITLE_LENGTH, max: ArticleFactors.MAX_TITLE_LENGTH })
        .withMessage(`Article title should be between length ${ArticleFactors.MIN_TITLE_LENGTH} and ${ArticleFactors.MAX_TITLE_LENGTH}`)
];