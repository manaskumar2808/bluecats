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
exports.LoginRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const user_not_found_1 = require("../../exceptions/user-not-found");
const bcryptjs_1 = require("bcryptjs");
const invalid_password_1 = require("../../exceptions/invalid-password");
const status_1 = require("../../constants/status");
const jwt_1 = require("../../utility/jwt");
const auth_1 = require("../../validators/auth");
const validate_request_1 = require("../../middlewares/validate-request");
const Router = express_1.default.Router();
exports.LoginRoute = Router;
Router.post('/api/auth/login', auth_1.LoginValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield user_1.User.findOne({ userName });
        if (!user)
            throw new user_not_found_1.UserNotFoundException();
        const encodedPassword = user === null || user === void 0 ? void 0 : user.password;
        const valid = yield (0, bcryptjs_1.compare)(password, encodedPassword);
        if (!valid)
            throw new invalid_password_1.InvalidPasswordException();
        const { token, expiryDate } = (0, jwt_1.getJWTPayload)(user);
        res === null || res === void 0 ? void 0 : res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Login success',
            payload: {
                user,
                token,
                expiryDate,
            },
        });
    }
    catch (err) {
        next(err);
    }
}));
