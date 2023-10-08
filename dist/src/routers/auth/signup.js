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
exports.SignupRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const bcryptjs_1 = require("bcryptjs");
const status_1 = require("../../constants/status");
const username_occupied_1 = require("../../exceptions/username-occupied");
const jwt_1 = require("../../utility/jwt");
const auth_1 = require("../../validators/auth");
const validate_request_1 = require("../../middlewares/validate-request");
const Router = express_1.default.Router();
exports.SignupRoute = Router;
Router.post('/api/auth/signup', auth_1.SignupValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { userName, firstName, lastName, phone, email, image, rand, password } = req === null || req === void 0 ? void 0 : req.body;
        const existingUser = yield user_1.User.findOne({ userName });
        if (existingUser)
            throw new username_occupied_1.UserNameAlreadyOccupiedException();
        const encodedPassword = yield (0, bcryptjs_1.hash)(password, 12);
        let name = '';
        if (firstName && ((_a = firstName === null || firstName === void 0 ? void 0 : firstName.trim()) === null || _a === void 0 ? void 0 : _a.length) > 0)
            name += firstName;
        if (lastName && ((_b = lastName === null || lastName === void 0 ? void 0 : lastName.trim()) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            if (((_c = name === null || name === void 0 ? void 0 : name.trim()) === null || _c === void 0 ? void 0 : _c.length) > 0)
                name += ' ' + lastName;
            else
                name += lastName;
        }
        const user = user_1.User.build({ userName, name, password: encodedPassword, phone, email, image, rand });
        yield user.save();
        const { token, expiryDate } = (0, jwt_1.getJWTPayload)(user);
        res === null || res === void 0 ? void 0 : res.status(status_1.StatusCode.SUCCESS).send({
            message: 'Signup success',
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
