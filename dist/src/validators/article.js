"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleValidator = void 0;
const express_validator_1 = require("express-validator");
const article_1 = require("../constants/article");
exports.ArticleValidator = [
    (0, express_validator_1.body)('title')
        .isLength({ min: article_1.ArticleFactors.MIN_TITLE_LENGTH, max: article_1.ArticleFactors.MAX_TITLE_LENGTH })
        .withMessage(`Article title should be between length ${article_1.ArticleFactors.MIN_TITLE_LENGTH} and ${article_1.ArticleFactors.MAX_TITLE_LENGTH}`)
];
