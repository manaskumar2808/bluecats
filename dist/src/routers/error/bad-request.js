"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const status_1 = require("../../constants/status");
const Route = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(status_1.StatusCode.BAD_REQUEST).send({
            error: (err === null || err === void 0 ? void 0 : err.message) || 'Bad request: invalid JSON!',
            payload: {},
        });
    }
    res.status(status_1.StatusCode.BAD_REQUEST).send({
        error: (err === null || err === void 0 ? void 0 : err.message) || 'Bad request!',
        payload: {},
    });
};
exports.BadRequest = Route;
