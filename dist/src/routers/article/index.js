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
exports.GetArticlesRoute = void 0;
const express_1 = __importDefault(require("express"));
const status_1 = require("../../constants/status");
const article_1 = require("../../models/article");
const image_1 = require("../../utility/image");
const Route = express_1.default.Router();
exports.GetArticlesRoute = Route;
// /api/article?user=[userId]
Route.get('/api/article/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.user;
        let articles = [];
        if (userId)
            articles = yield article_1.Article.find({ author: userId }).populate('author');
        else
            articles = yield article_1.Article.find().populate('author');
        for (let article of articles) {
            article.image = (0, image_1.getModifiedImageURL)(article === null || article === void 0 ? void 0 : article.image);
        }
        res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Articles fetched successfully',
            payload: {
                articles,
            }
        });
    }
    catch (err) {
        next(err);
    }
}));
