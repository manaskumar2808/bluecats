"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWTPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJWTPayload = (user) => {
    var _a;
    const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JWT_SECRET, { expiresIn: '24h' });
    const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;
    return {
        token,
        expiryDate,
    };
};
exports.getJWTPayload = getJWTPayload;
