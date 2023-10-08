"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordException = void 0;
class InvalidPasswordException extends Error {
    constructor(msg = 'Invalid Password!') {
        super(msg);
        this.name = 'InvalidPasswordException';
        this.message = msg;
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
