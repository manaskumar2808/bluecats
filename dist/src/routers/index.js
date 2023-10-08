"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoute = void 0;
const express_1 = __importDefault(require("express"));
const status_1 = require("../constants/status");
const Route = express_1.default.Router();
exports.HomeRoute = Route;
Route.get('/api/home/', (req, res, next) => {
    try {
        res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Home page',
            payload: {}
        });
    }
    catch (err) {
        next(err);
    }
});
