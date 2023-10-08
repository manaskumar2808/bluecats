"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRoute = void 0;
const express_1 = __importDefault(require("express"));
const s3_1 = require("../../../s3");
const Router = express_1.default.Router();
exports.GalleryRoute = Router;
Router.get('/uploads/:key', (req, res) => {
    const key = req.params.key;
    const readStream = (0, s3_1.getFileStream)(key);
    readStream.pipe(res);
});
