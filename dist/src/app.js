"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importStar(require("multer"));
const page_not_found_1 = require("./routers/error/page-not-found");
const bad_request_1 = require("./routers/error/bad-request");
const internal_server_1 = require("./routers/error/internal-server");
const gallery_1 = require("./routers/gallery");
const article_1 = require("./routers/article");
const show_1 = require("./routers/article/show");
const post_1 = require("./routers/article/post");
const login_1 = require("./routers/auth/login");
const signup_1 = require("./routers/auth/signup");
const show_2 = require("./routers/user/show");
const update_1 = require("./routers/user/update");
const password_1 = require("./routers/user/password");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.set('trust proxy', true);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage }).single('file');
app.use(upload);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(login_1.LoginRoute);
app.use(signup_1.SignupRoute);
app.use(gallery_1.GalleryRoute);
app.use(article_1.GetArticlesRoute);
app.use(show_1.GetArticleRoute);
app.use(post_1.PostArticleRoute);
app.use(show_2.UserShowRoute);
app.use(update_1.UserUpdateRoute);
app.use(password_1.UserPasswordRoute);
app.all('*', page_not_found_1.PageNotFound);
app.use(bad_request_1.BadRequest);
app.use(internal_server_1.InternalServer);
