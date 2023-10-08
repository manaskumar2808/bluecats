"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    var _a, _b;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            const error = (_b = (_a = errors === null || errors === void 0 ? void 0 : errors.array()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.msg;
            throw new Error(`Request validation failed, ${error}`);
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateRequest = validateRequest;
