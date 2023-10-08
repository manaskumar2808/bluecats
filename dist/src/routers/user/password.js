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
exports.UserPasswordRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const status_1 = require("../../constants/status");
const user_not_found_1 = require("../../exceptions/user-not-found");
const bcryptjs_1 = require("bcryptjs");
const invalid_password_1 = require("../../exceptions/invalid-password");
const Router = express_1.default.Router();
exports.UserPasswordRoute = Router;
Router.put('/api/password-reset/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield user_1.User.findById(id);
        if (!user)
            throw new user_not_found_1.UserNotFoundException();
        const { oldPassword, newPassword } = req === null || req === void 0 ? void 0 : req.body;
        const valid = yield (0, bcryptjs_1.compare)(oldPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!valid)
            throw new invalid_password_1.InvalidPasswordException();
        const passwordHash = yield (0, bcryptjs_1.hash)(newPassword, 12);
        user.set({
            password: passwordHash,
        });
        yield user.save();
        res === null || res === void 0 ? void 0 : res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Password reset success',
            payload: {
                user
            },
        });
    }
    catch (err) {
        next(err);
    }
}));
