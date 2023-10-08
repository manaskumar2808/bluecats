"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServer = void 0;
const status_1 = require("../../constants/status");
const Route = (err, req, res, next) => {
    res.status(status_1.StatusCode.INTERNAL_SERVER_ERROR).send({
        error: (err === null || err === void 0 ? void 0 : err.message) || 'Internal server error!',
        payload: {},
    });
};
exports.InternalServer = Route;
