import { body } from 'express-validator';
import { AuthFactors } from '../constants/auth';

export const LoginValidator = [
    body('userName')
        .isLength({
            min: AuthFactors.MIN_USERNAME_LENGTH,
            max: AuthFactors.MAX_USERNAME_LENGTH,
        })
        .withMessage(`Username length must be between ${AuthFactors.MIN_USERNAME_LENGTH} and ${AuthFactors.MAX_USERNAME_LENGTH}`),
    body('password')
        .isLength({ min: AuthFactors.MIN_PASSWORD_LENGTH })
        .withMessage(`Password length must be atleast ${AuthFactors.MIN_PASSWORD_LENGTH}`),
];

export const SignupValidator = [
    body('userName')
        .isLength({
            min: AuthFactors.MIN_USERNAME_LENGTH,
            max: AuthFactors.MAX_USERNAME_LENGTH,
        })
        .withMessage(`Username length must be between ${AuthFactors.MIN_USERNAME_LENGTH} and ${AuthFactors.MAX_USERNAME_LENGTH}`),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: AuthFactors.MIN_PASSWORD_LENGTH })
        .withMessage(`Password length must be atleast ${AuthFactors.MIN_PASSWORD_LENGTH}`),
];