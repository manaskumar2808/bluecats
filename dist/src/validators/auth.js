"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupValidator = exports.LoginValidator = void 0;
const express_validator_1 = require("express-validator");
const auth_1 = require("../constants/auth");
exports.LoginValidator = [
    (0, express_validator_1.body)('userName')
        .isLength({
        min: auth_1.AuthFactors.MIN_USERNAME_LENGTH,
        max: auth_1.AuthFactors.MAX_USERNAME_LENGTH,
    })
        .withMessage(`Username length must be between ${auth_1.AuthFactors.MIN_USERNAME_LENGTH} and ${auth_1.AuthFactors.MAX_USERNAME_LENGTH}`),
    (0, express_validator_1.body)('password')
        .isLength({ min: auth_1.AuthFactors.MIN_PASSWORD_LENGTH })
        .withMessage(`Password length must be atleast ${auth_1.AuthFactors.MIN_PASSWORD_LENGTH}`),
];
exports.SignupValidator = [
    (0, express_validator_1.body)('userName')
        .isLength({
        min: auth_1.AuthFactors.MIN_USERNAME_LENGTH,
        max: auth_1.AuthFactors.MAX_USERNAME_LENGTH,
    })
        .withMessage(`Username length must be between ${auth_1.AuthFactors.MIN_USERNAME_LENGTH} and ${auth_1.AuthFactors.MAX_USERNAME_LENGTH}`),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: auth_1.AuthFactors.MIN_PASSWORD_LENGTH })
        .withMessage(`Password length must be atleast ${auth_1.AuthFactors.MIN_PASSWORD_LENGTH}`),
];
