"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostArticleRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const express_1 = __importDefault(require("express"));
const status_1 = require("../../constants/status");
const article_1 = require("../../models/article");
const s3_1 = require("../../../s3");
const image_1 = require("../../utility/image");
const article_2 = require("../../validators/article");
const validate_request_1 = require("../../middlewares/validate-request");
const Route = express_1.default.Router();
exports.PostArticleRoute = Route;
const unlink = util_1.default.promisify(fs_1.default.unlink);
Route.post('/api/article/', article_2.ArticleValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, image, author } = (req === null || req === void 0 ? void 0 : req.body) || {};
        const file = req === null || req === void 0 ? void 0 : req.file;
        let imageUrl;
        if (file) {
            imageUrl = file.path;
            const result = yield (0, s3_1.uploadFile)(file);
            imageUrl = 'uploads/' + result.Key;
            yield unlink(file.path);
        }
        const url = imageUrl || image;
        let article = article_1.Article.build({ title, content, image: url, author });
        yield (article === null || article === void 0 ? void 0 : article.save());
        article.image = (0, image_1.getModifiedImageURL)(article === null || article === void 0 ? void 0 : article.image);
        res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Article posted successfully',
            payload: {
                article
            }
        });
    }
    catch (err) {
        next(err);
    }
}));
