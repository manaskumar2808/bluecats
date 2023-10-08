"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNotFound = void 0;
const status_1 = require("../../constants/status");
const Route = (req, res, next) => {
    res.status(status_1.StatusCode.PAGE_NOT_FOUND).send({
        error: 'Page not found!',
        payload: {},
    });
};
exports.PageNotFound = Route;
