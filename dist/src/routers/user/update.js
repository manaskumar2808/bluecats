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
exports.UserUpdateRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const status_1 = require("../../constants/status");
const username_occupied_1 = require("../../exceptions/username-occupied");
const user_not_found_1 = require("../../exceptions/user-not-found");
const Router = express_1.default.Router();
exports.UserUpdateRoute = Router;
Router.put('/api/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield user_1.User.findById(id);
        if (!user)
            throw new user_not_found_1.UserNotFoundException();
        const { userName, firstName, lastName, phone, email, image } = req === null || req === void 0 ? void 0 : req.body;
        const existingUser = yield user_1.User.findOne({ userName });
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) !== (user === null || user === void 0 ? void 0 : user.id))
            throw new username_occupied_1.UserNameAlreadyOccupiedException();
        let name = '';
        if (firstName && ((_b = firstName === null || firstName === void 0 ? void 0 : firstName.trim()) === null || _b === void 0 ? void 0 : _b.length) > 0)
            name += firstName;
        if (lastName && ((_c = lastName === null || lastName === void 0 ? void 0 : lastName.trim()) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            if (((_d = name === null || name === void 0 ? void 0 : name.trim()) === null || _d === void 0 ? void 0 : _d.length) > 0)
                name += ' ' + lastName;
            else
                name += lastName;
        }
        user.set({
            userName,
            name,
            phone,
            email,
            image,
        });
        yield user.save();
        res === null || res === void 0 ? void 0 : res.status(status_1.StatusCode.SUCCESS).send({
            message: 'User update success',
            payload: {
                user
            },
        });
    }
    catch (err) {
        next(err);
    }
}));
